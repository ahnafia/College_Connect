package com.cc.CollegeConnect;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StudentService implements UserDetailsService {
    private StudentRepo studentRepo;
    private static String USER_NOT_FOUND = "%s is not registered";

    public Student addStudent(Student student){
        return studentRepo.save(student);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return studentRepo.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException(String.format(USER_NOT_FOUND, email)));
    }

    public List<Student> getAllStudents() {
        List<Student> students = new ArrayList<>();
        studentRepo.findAll().forEach(students::add);
        return students;
    }

    public Optional<Student> getStudent(String email){
        return studentRepo.findByEmail(email);
    }

    public Student updateStudent(String username, UpdateStudentDto updateStudentDto) {
        Optional<Student> optionalStudent = studentRepo.findByUsername(username);

        if (optionalStudent.isEmpty()) {
            throw new RuntimeException("Student not found");
        }

        Student student = optionalStudent.get();

        // Update only the fields that are provided
        if (updateStudentDto.getHeadline() != null) {
            student.setHeadline(updateStudentDto.getHeadline());
        }
        if (updateStudentDto.getBio() != null) {
            student.setBio(updateStudentDto.getBio());
        }
        if (updateStudentDto.getInterests() != null) {
            student.setInterests(updateStudentDto.getInterests());
        }
        student.setLookingForSimilarInterests(updateStudentDto.isLookingForSimilarInterests());
        if (updateStudentDto.getGoals() != null) {
            student.setGoals(updateStudentDto.getGoals());
        }
        if (updateStudentDto.getEducation() != null) {
            student.setEducation(updateStudentDto.getEducation());
        }
        if (updateStudentDto.getWorkExperiences() != null) {
            student.setWorkExperiences(updateStudentDto.getWorkExperiences());
        }
        if (updateStudentDto.getExtracurriculars() != null) {
            student.setExtracurriculars(updateStudentDto.getExtracurriculars());
        }
        if (updateStudentDto.getSkills() != null) {
            student.setSkills(updateStudentDto.getSkills());
        }
        if (updateStudentDto.getContactInfo() != null) {
            student.setContactInfo(updateStudentDto.getContactInfo());
        }

        // Save the updated student back to the database
        return studentRepo.save(student);
    }

    public Long idGenerator(){
        return (long) (Math.random() * (10000) + 1);
    }
}
