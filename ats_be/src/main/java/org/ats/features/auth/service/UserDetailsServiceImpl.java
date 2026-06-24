package org.ats.features.auth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ats.entities.Role;
import org.ats.entities.User;
import org.ats.features.auth.repository.RoleRepository;
import org.ats.features.auth.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // ?
        Optional<User> userOptional = userRepository.findByEmail(username);
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("Username not found!"));

        List<Role> roles = roleRepository.findByUsers_Email(user.getEmail());
        List<GrantedAuthority> grantedAuthorities = roles.stream()
                .map((role) -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());

        log.info("Loading user roles={}", grantedAuthorities);

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPasswordHash(), grantedAuthorities);
        return userDetails;
    }
}
