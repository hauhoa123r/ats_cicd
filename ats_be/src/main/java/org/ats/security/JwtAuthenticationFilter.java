package org.ats.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ats.features.auth.dto.CustomUserDetails;
import org.springframework.core.Ordered;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter implements Ordered {
    public static final String ACCESS_TOKEN_COOKIE = "accessToken";

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        log.info("JwtAuthenticationFilter - 1");
        String jwt = null;

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (ACCESS_TOKEN_COOKIE.equals(cookie.getName())) {
                    // Get token from cookie
                    jwt = cookie.getValue();
                }
            }
        }

        // No token (e.g. public endpoints) -> let the chain continue.
        // Authorization rules / AuthenticationEntryPoint will reject protected URLs.
        if (jwt == null || SecurityContextHolder.getContext().getAuthentication() != null) {

            log.info("JwtAuthenticationFilter {}", jwt);

            filterChain.doFilter(request, response);
            return;
        }

        try {
            String email = jwtService.extractUsername(jwt);

            CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(email);

            if (jwtService.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // Malformed / expired / tampered token, or user no longer exists.
            // Clear context and continue unauthenticated.
            log.warn("Failed to authenticate JWT: {}", e.getMessage());
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    @Override
    public int getOrder() {
        return 2;
    }
}
