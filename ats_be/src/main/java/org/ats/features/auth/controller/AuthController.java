package org.ats.features.auth.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ats.features.auth.dto.UserRequest;
import org.ats.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auths")
@Slf4j
@RequiredArgsConstructor
public class AuthController {
    private  final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@Valid @RequestBody UserRequest userRequest){
      log.info("User request {}", userRequest);

      // Delegate to Authentication Manager.authenticate
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(userRequest.getEmail(), userRequest.getPassword()));
        // Tự gọi hàm loadUserByUsername

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        log.info("User details {}", userDetails.getUsername());

        // Store to context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate Token
        String accessToken = jwtService.generateAccessToken(userDetails);

      return new ResponseEntity<>(accessToken, HttpStatus.OK);
    }
}
