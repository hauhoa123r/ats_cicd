package org.ats.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ats.features.auth.service.UserDetailsServiceImpl;
import org.ats.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

//    @Bean
//    @Order(1)
//    public SecurityFilterChain securityFilterChain2(HttpSecurity http) throws Exception {
//        log.info("springSecurityFilterChain - 1");
//        http.authorizeHttpRequests(authorizeRequests ->authorizeRequests.anyRequest().permitAll());
//        return http.build();
//    }

    @Bean
    @Order(2)
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        log.info("securityFilterChain - 2");
        http.csrf((csrf) -> csrf.disable())
                .cors((cors) -> cors.configurationSource(configurationSource()))
                // Stateless: do not create HTTP sessions, authenticate every request via JWT
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((auth) -> {
                    log.info("securityFilterChain - 3");
                    auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                            .requestMatchers(
                                    "/api/v1/jobs/public/**",
                                    "/api/v1/departments/public/**",
                                    "/api/v1/locations/**",
                                    "/api/v1/auths/**",
                                    "/swagger-ui/**",
                                    "/v3/api-docs/**"
                            ).permitAll()
                            .anyRequest().authenticated();
                })
                // Return 401 (not the default 403) when an unauthenticated user hits a protected URL
                .exceptionHandling((ex) -> {
                    log.info("securityFilterChain - {}", ex.toString());
                    ex.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
                })
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        ;

        return http.build();
    }

    @Bean
    public CorsConfigurationSource configurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000", "https://ats.fpt.vn", "http://localhost:1122"));
        corsConfiguration.setAllowCredentials(true);// Cho phép/ mọi request đính kèm cookie

        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();
        corsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);

        return corsConfigurationSource;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsServiceImpl userDetailsService) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());

        return new ProviderManager(authenticationProvider);
    }
}
