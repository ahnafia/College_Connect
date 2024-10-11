package com.cc.CollegeConnect.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

public class EmailConfiguration {
    @Value("${spring.mail.username")
    private String emailUsername;

    @Value("${spring.mail.password")
    private String emailPassword;

    @Bean
    public JavaMailSender javaMailSender(){
        JavaMailSenderImpl mailer = new JavaMailSenderImpl();
        mailer.setHost("smtp.gmail.com");
        mailer.setPort(587);
        mailer.setUsername(emailUsername);
        mailer.setPassword(emailPassword);

        Properties props = mailer.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailer;
    }
}
