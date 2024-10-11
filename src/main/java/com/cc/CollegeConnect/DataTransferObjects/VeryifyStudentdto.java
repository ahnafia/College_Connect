package com.cc.CollegeConnect.DataTransferObjects;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class VeryifyStudentdto {
    private String email;
    private String verificationCode;
}
