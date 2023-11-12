package ru.spbstu.deanary.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.deanary.dto.SubjectDto;
import ru.spbstu.deanary.service.SubjectService;

import java.util.List;

@RestController
@RequestMapping("api/v1/subjects")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping("/create")
    public ResponseEntity<Long> createSubject(@RequestBody SubjectDto request) {
        return ResponseEntity.ok(subjectService.createSubject(request));
    }

    @PutMapping("/edit")
    public ResponseEntity<String> editSubject(@RequestParam("id") Long id, @RequestBody SubjectDto request) throws Exception {
        return ResponseEntity.ok(subjectService.editSubject(id, request));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteSubject(@RequestParam("id") Long id) throws Exception {
        return ResponseEntity.ok(subjectService.deleteSubject(id));
    }

    @GetMapping("/")
    public ResponseEntity<List<SubjectDto>> getSubjectList() {
        return ResponseEntity.ok(subjectService.getSubjectList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectDto> getSubject(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(subjectService.getSubject(id));
    }

}
