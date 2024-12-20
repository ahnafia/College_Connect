package com.cc.CollegeConnect.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendVerificationEmail(String studentEmail, String subject, String text) throws MessagingException {
        MimeMessage emailContent = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(emailContent, true);
        messageHelper.setTo(studentEmail);
        messageHelper.setSubject(subject);
        messageHelper.setFrom("noreplycollegeconnect10@gmail.com");
        messageHelper.setText(text, true);
        javaMailSender.send(emailContent);
    }
}
