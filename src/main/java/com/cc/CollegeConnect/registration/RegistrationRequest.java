package com.cc.CollegeConnect.registration;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@AllArgsConstructor
@EqualsAndHashCode
@Getter
public class RegistrationRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;

}
