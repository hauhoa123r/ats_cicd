package org.ats.features.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ats.entities.RefreshToken;
import org.ats.entities.User;
import org.ats.features.auth.dto.TokenRefreshResult;
import org.ats.features.auth.repository.RefreshTokenRepository;
import org.ats.features.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;

/**
 * Manages refresh tokens with database storage and rotation.
 *
 * The raw token is a random, opaque string that lives only in the browser cookie.
 * The database keeps the SHA-256 hash of that string. On every refresh we rotate:
 * the used token is revoked and a fresh one is issued. If a revoked or expired
 * token is presented again, we revoke every token of that user, because such reuse
 * is a strong signal that the token was stolen.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @Value("${refresh-expiration-time}")
    private long refreshExpirationMs;

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    /**
     * Creates and stores a new refresh token for the given user.
     * @return the raw token to place in the cookie (never stored as is)
     */
    @Transactional
    public String createToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        String rawToken = generateRawToken();

        RefreshToken entity = RefreshToken.builder()
                .tokenHash(hash(rawToken))
                .user(user)
                .expiresAt(Instant.now().plusMillis(refreshExpirationMs))
                .revoked(false)
                .build();

        refreshTokenRepository.save(entity);
        return rawToken;
    }

    /**
     * Validates the presented refresh token and rotates it.
     * @return the user email plus a new raw refresh token
     * @throws BadCredentialsException when the token is missing, expired, or revoked
     */
    @Transactional
    public TokenRefreshResult rotate(String rawToken) { // refresh

        RefreshToken stored = refreshTokenRepository.findByTokenHash(hash(rawToken))
                .orElseThrow(() -> new BadCredentialsException("Invalid refresh token"));

        if (stored.isRevoked() || stored.getExpiresAt().isBefore(Instant.now())) {
            // Reuse of an already used or expired token: treat as theft and revoke everything.
            log.warn("Refresh token reuse detected for userId={}", stored.getUser().getId());
            refreshTokenRepository.revokeAllByUser(stored.getUser().getId());
            throw new BadCredentialsException("Refresh token is no longer valid");
        }

        // Rotate: revoke the used token, then issue a new one.
        stored.setRevoked(true);
        refreshTokenRepository.save(stored);

        String email = stored.getUser().getEmail();
        String newRawToken = createToken(email);
        return new TokenRefreshResult(email, newRawToken);
    }

    /**
     * Revokes the presented token on logout. Silent if the token is unknown.
     */
    @Transactional
    public void revoke(String rawToken) {
        if (rawToken == null) {
            return;
        }
        refreshTokenRepository.findByTokenHash(hash(rawToken)).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    private String generateRawToken() {
        byte[] bytes = new byte[64];
        SECURE_RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String hash(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashed = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hashed);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 algorithm not available", e);
        }
    }
}
