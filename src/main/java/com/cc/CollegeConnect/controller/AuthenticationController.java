package com.cc.CollegeConnect.controller;



import com.cc.CollegeConnect.DataTransferObjects.LoginStudentdto;
import com.cc.CollegeConnect.DataTransferObjects.RegisterStudentdto;
import com.cc.CollegeConnect.DataTransferObjects.VeryifyStudentdto;
import com.cc.CollegeConnect.Student;
import com.cc.CollegeConnect.StudentService;
import com.cc.CollegeConnect.response.LoginResponse;
import com.cc.CollegeConnect.service.AuthenticationService;
import com.cc.CollegeConnect.service.JwtService;
import jakarta.mail.MessagingException;
import lombok.extern.java.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private JwtService jwtService;
    private AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<RegisterStudentdto> signup(@RequestBody RegisterStudentdto registerStudentdto) throws MessagingException {
        Student signedUpStudent = authenticationService.signup(registerStudentdto);
        return ResponseEntity.ok(registerStudentdto);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginStudentdto loginStudentdto){
        System.out.println("yes");
        Student loggedInStudent = authenticationService.authenticate(loginStudentdto);
        String token = jwtService.generateToken(loggedInStudent);
        LoginResponse loginResponse = new LoginResponse(token, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyStudent(@RequestBody VeryifyStudentdto veryifyStudentdto){
        try{
            authenticationService.verifyStudent(veryifyStudentdto);
            return ResponseEntity.ok("Account is verified");
        } catch (RuntimeException exception){
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendEmail(@RequestBody String email){
        try{
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code has been sent");
        } catch (RuntimeException exception){
            return ResponseEntity.badRequest().body(exception.getMessage());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
