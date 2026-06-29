package org.ats.features.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Builder
@Setter
@Getter
@ToString
public class UserProfile {
    private  String email;
    private String fullName;
    private List<String> roles;
}
