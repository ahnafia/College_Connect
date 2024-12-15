package com.cc.CollegeConnect.controller;

import com.cc.CollegeConnect.Student;
import com.cc.CollegeConnect.service.StudentService;
import com.cc.CollegeConnect.service.UpdateStudentDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/student")
public class StudentController {
    private StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/matches_{username}")
    public ResponseEntity<ArrayList<String>> matches(@PathVariable("username") String username){
        ArrayList<String> user_matches = studentService.Matches(username);

        return ResponseEntity.ok(user_matches);
    }
    @PostMapping("/connect{username}+{user_requested}")
    public ResponseEntity<Boolean> connect(@PathVariable("username") String username,@PathVariable("user_requested") String user_requested){
        System.out.println(username + user_requested);
        Boolean check = studentService.connect(username, user_requested);
        return ResponseEntity.ok(check);
    }
    @GetMapping("/findsimiliar/{username}")
    public ResponseEntity<String> getSimiliarStudents(@PathVariable(value = "username") String username) throws IOException, InterruptedException {
        String students = studentService.findSimiliar(username);
        return ResponseEntity.ok(students);
    }
    @PostMapping("/add")
    public ResponseEntity<Student> addStudent(@RequestBody Student student){
        Student student1 = studentService.addStudents(student);
        return ResponseEntity.ok(student1);
    }

    @GetMapping
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    @GetMapping("/{email}")
    public ResponseEntity<Optional<Student>> getStudent(@PathVariable(value = "email") String email){
        return ResponseEntity.ok().body(studentService.getStudent(email));
    }

    @PutMapping("/{username}/update")
    public ResponseEntity<Student> updateStudent(@PathVariable(value = "username") String username,
                                 @RequestBody UpdateStudentDto updatedStudent){
        Student student = studentService.updateStudent(username, updatedStudent);
        return ResponseEntity.ok(student);
    }


}
