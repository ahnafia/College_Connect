package com.cc.CollegeConnect;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/student")
public class StudentController {
    private StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
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
    public ResponseEntity<Student> updateStudent(@PathVariable String username,
                                 @RequestBody UpdateStudentDto updatedStudent){
        Student student = studentService.updateStudent(username, updatedStudent);
        return ResponseEntity.ok(student);
    }


}
