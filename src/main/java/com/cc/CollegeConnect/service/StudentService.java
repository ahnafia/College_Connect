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

    public ArrayList<String> connections(String username){
        List<Matches> matches = matchesRepo.findAll();

        ArrayList<String> user_connections = new ArrayList<>();
        for (Matches match : matches) {
            if (match.isConnection_accepted()) {
                if (match.getConnectionRequest_user().equals(username)){
                    user_connections.add(match.getRequested_user());
                } else if ((match.getRequested_user().equals(username))){
                    user_connections.add(match.getConnectionRequest_user());
                }

            }
        }
        System.out.println(user_connections);
        return user_connections;

    }

    public boolean accept(String user_request, String user_requested){
        List<Matches> matches = matchesRepo.findAll();
        ArrayList<String> user_matches = new ArrayList<>();
        Matches updates_match = null;
        for (Matches match : matches) {
            if ((match.getConnectionRequest_user().equals(user_request) && match.getRequested_user().equals(user_requested))) {
                match.setConnection_accepted(true);
                updates_match = match;
            }
        }
        assert updates_match != null;
        matchesRepo.save(updates_match);
        return true;
    }
    public Student addStudent(Student student){
        return studentRepo.save(student);
    }

    public ArrayList<String> Matches(String username){
        List<Matches> matches = matchesRepo.findAll();

        ArrayList<String> user_matches = new ArrayList<>();
        for (Matches match : matches) {
            if (match.getConnectionRequest_user().equals(username) && !match.isConnection_accepted()) {
                user_matches.add(match.getRequested_user());
            }
        }
        System.out.println(user_matches);
        return user_matches;
    }
    public boolean connect(String user_request, String user_requested){
        Matches match = new Matches(user_request,user_requested, false);
        matchesRepo.save(match);
        return true;

    }
    public String caller(String username) throws IOException, InterruptedException {
        String baseUrl = "****";
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
        return caller(username);
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

    public Student getStudentByUsername(String username){
        return studentRepo.findByUsername(username).get();
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
