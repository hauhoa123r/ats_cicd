package org.ats.features.auth.dto;

/**
 * Returned by the refresh-token rotation step: the owning user's email plus the
 * brand new raw refresh token that must be sent back to the browser as a cookie.
 */
public record TokenRefreshResult(String email, String refreshToken) {
}
