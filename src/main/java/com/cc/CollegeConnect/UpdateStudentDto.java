package com.cc.CollegeConnect;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class UpdateStudentDto {
    private String headline;
    private String bio;
    private ArrayList<String> interests;
    private boolean lookingForSimilarInterests;
    private ArrayList<String> goals;
    private ArrayList<String> education;
    private ArrayList<String> workExperiences;
    private ArrayList<String> extracurriculars;
    private ArrayList<String> skills;
    private String contactInfo;
}
