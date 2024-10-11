package com.cc.CollegeConnect.controller;

import com.cc.CollegeConnect.DataTransferObjects.LoginStudentdto;
import com.cc.CollegeConnect.Student;
import com.cc.CollegeConnect.response.LoginResponse;
import com.cc.CollegeConnect.service.AuthenticationService;
import com.cc.CollegeConnect.service.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/user")
@RestController
@AllArgsConstructor
public class UserController {
    private JwtService jwtService;
    private AuthenticationService authenticationService;

    @PostMapping("/profile")
    public ResponseEntity<Student> getProfile(@RequestBody String token) {
        System.out.println("Token found");
        // Remove the "Bearer " prefix from the token
        String jwtToken = token.substring(16);
        System.out.println(jwtToken);

        // Extract email from the token
        String username = jwtService.extractUsername(jwtToken);

        // Retrieve user information using email
        Student student = authenticationService.getStudentByUser(username);

        return ResponseEntity.ok(student);
    }
}
