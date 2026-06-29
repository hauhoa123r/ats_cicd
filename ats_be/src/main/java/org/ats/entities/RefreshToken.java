package org.ats.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

/**
 * A server-side record of a refresh token.
 * We never store the raw token; we keep only its SHA-256 hash so a database leak
 * does not hand out usable tokens. Each refresh rotates the token (the old row is
 * marked revoked and a new row is created).
 */
@Entity
@Table(name = "refresh_tokens", indexes = @Index(name = "idx_refresh_token_hash", columnList = "token_hash"))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "token_hash", nullable = false, unique = true, length = 100)
    private String tokenHash;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;

    @Column(nullable = false)
    private boolean revoked;
}
