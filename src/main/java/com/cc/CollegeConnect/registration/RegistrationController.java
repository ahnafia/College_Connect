package com.cc.CollegeConnect.registration;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/registration")
@AllArgsConstructor
public class RegistrationController {
    private RegistrationService registrationService;

    public String register(@RequestBody RegistrationRequest registrationRequest){
        return registrationService.register(registrationRequest);
    }
}
