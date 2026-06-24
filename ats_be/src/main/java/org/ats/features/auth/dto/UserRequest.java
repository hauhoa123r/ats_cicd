package org.ats.features.auth.dto;

import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserRequest {
//    @Pattern(regexp = "^[A-Z0-9._]+@[A-Z0-9.-]+\\\\.[A-Z]{2,6}$", message = "Email is wrong!")
    private  String email;

//    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d)(?=.*[@#$%^&+=]).{3,}$", message = "Password is wrong!")
    private String password;
}
