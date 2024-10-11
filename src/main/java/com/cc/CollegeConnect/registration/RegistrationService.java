package com.cc.CollegeConnect.registration;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    public String register(RegistrationRequest registrationRequest){
        return "works";
    }
}
