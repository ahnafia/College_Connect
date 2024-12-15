package com.cc.CollegeConnect.service;

import com.cc.CollegeConnect.Matches;
import com.cc.CollegeConnect.MatchesRepo;
import com.cc.CollegeConnect.Student;
import com.cc.CollegeConnect.StudentRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.lang.reflect.Array;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StudentService implements UserDetailsService {
    private StudentRepo studentRepo;
    private MatchesRepo matchesRepo;
    private static String USER_NOT_FOUND = "%s is not registered";

    public Student addStudent(Student student){
        return studentRepo.save(student);
    }

    public ArrayList<String> Matches(String username){
        List<Matches> matches = matchesRepo.findAll();

        ArrayList<String> user_matches = new ArrayList<>();
        for (int i = 0; i < matches.size(); i++) {
            if (matches.get(i).getConnectionRequest_user().equals(username)){
                user_matches.add(matches.get(i).getRequested_user());
            }
        }
        return user_matches;

    }
    public boolean connect(String user_request, String user_requested){
        Matches match = new Matches(user_request,user_requested);
        matchesRepo.save(match);
        return true;

    }
    public String caller(String username) throws IOException, InterruptedException {
        String baseUrl = "http://127.0.0.1:5000/get_similiar/";
        String url = baseUrl + username;
        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();
    }

    public String findSimiliar(String username) throws IOException, InterruptedException {
        return caller("johndoe");
    }

    public Student addStudents(Student student){
        studentRepo.save(student);
        return  student;
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
        if (updateStudentDto.getName() != null) {
            student.setName(updateStudentDto.getName());
        }
        if (updateStudentDto.getBio() != null) {
            student.setBio(updateStudentDto.getBio());
        }
        if (updateStudentDto.getInterests() != null) {
            student.setInterests(updateStudentDto.getInterests());
        }
        if (updateStudentDto.getEducation() != null) {
            student.setEducation(updateStudentDto.getEducation());
        }
        if (updateStudentDto.getExtracurriculars() != null) {
            student.setExtracurriculars(updateStudentDto.getExtracurriculars());
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
