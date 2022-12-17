package com.ungalthedal.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterRequest {
    private String userName;
    private String firstName;
    private String lastName;
    private String gender;
    private String mobile;
    private String email;
    private String password;
}
