package org.ats.features.auth.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {
    private static final long serialVersionUID = 1L;
    private String email;
    private String fullName;
    private  String password;
    private List<GrantedAuthority> grantedAuthorities;

    public CustomUserDetails(String email, String fullName, String password, List<GrantedAuthority> grantedAuthorities) {
        this.email = email;
        this.fullName = fullName;
        this.password = password;
        this.grantedAuthorities = grantedAuthorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }
}
