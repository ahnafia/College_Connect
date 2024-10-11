package com.cc.CollegeConnect.service;

import com.cc.CollegeConnect.DataTransferObjects.LoginStudentdto;
import com.cc.CollegeConnect.DataTransferObjects.RegisterStudentdto;
import com.cc.CollegeConnect.DataTransferObjects.VeryifyStudentdto;
import com.cc.CollegeConnect.Student;
import com.cc.CollegeConnect.StudentRepo;
import com.cc.CollegeConnect.StudentService;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private StudentRepo studentRepo;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private EmailService emailService;
    private StudentService studentService;

    private static String verifyCode;

    public Student signup(RegisterStudentdto registerStudentdto) throws MessagingException {
        Student student = new Student(registerStudentdto.getUsername(), registerStudentdto.getEmail(),
                passwordEncoder.encode(registerStudentdto.getPassword()));
        verifyCode = generateVerificationCode();
        student.setVerificationCode(verifyCode);
        student.setVerificationExpiry(LocalDateTime.now().plusMinutes(15));
        student.setEnabled(false);
        sendVerificationEmail(student);

        student.setId(studentService.idGenerator());

        return studentRepo.save(student);
    }



    public Student authenticate(LoginStudentdto loginStudentdto){
        Student student = studentRepo.findByEmail(loginStudentdto.getEmail())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!student.isEnabled()){
            throw new RuntimeException("Please verify your account");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginStudentdto.getEmail()
                        , loginStudentdto.getPassword())
        );

        return student;
    }

    public void verifyStudent(VeryifyStudentdto verifyDto) {
        Optional<Student> optionalStudent = studentRepo.findByEmail(verifyDto.getEmail());
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            if (student.getVerificationExpiry().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Verification code has expired");
            }
            if (student.getVerificationCode().equals(verifyDto.getVerificationCode())) {
                student.setEnabled(true);
                student.setVerificationCode(null);
                student.setVerificationExpiry(null);
                studentRepo.save(student);
            } else {
                throw new RuntimeException("Invalid verification code");
            }
        } else {
            throw new RuntimeException("User not found" + verifyDto.getVerificationCode());
        }
    }

    public void resendVerificationCode(String email) throws MessagingException {
        Optional<Student> optionalStudent = studentRepo.findByEmail(email);
        if (optionalStudent.isPresent()){
            Student student = optionalStudent.get();
            if (!student.isEnabled()){
                student.setVerificationCode(verifyCode);
                student.setVerificationExpiry(LocalDateTime.now().plusMinutes(15));
                sendVerificationEmail(student);
                studentRepo.save(student);
            } else {
                throw new RuntimeException("This account is already verified," +
                        " no0 further actions need to be taken");
            }
        } else {
            throw new RuntimeException("This student is not found");
        }
    }

    public void sendVerificationEmail(Student student) throws MessagingException {
        String subject = "Account Verification Code";
        String code = "Your verification code is " + verifyCode + " and it will expire in 15 minutes";
        String html = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + code + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
        emailService.sendVerificationEmail(student.getEmail(), subject, html);
    }


    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }

    public Student getStudentByUser(String username){
        return studentRepo.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

}
