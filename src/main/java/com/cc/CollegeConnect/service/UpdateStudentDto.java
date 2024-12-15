package com.cc.CollegeConnect.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateStudentDto {
    private String name;
    private String bio;
    private String interests;
    private String education;
    private String extracurriculars;
    private String contactInfo;
}
