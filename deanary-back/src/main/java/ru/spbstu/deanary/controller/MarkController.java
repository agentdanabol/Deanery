package ru.spbstu.deanary.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.deanary.dto.MarkDto;
import ru.spbstu.deanary.service.MarkService;

import java.util.List;

@RestController
@RequestMapping("api/v1/marks")
public class MarkController {

    private final MarkService markService;

    public MarkController(MarkService markService) {
        this.markService = markService;
    }

    @PostMapping("/create")
    public ResponseEntity<Long> createMark(@RequestBody MarkDto request) throws Exception {
        return ResponseEntity.ok(markService.createMark(request));
    }

    @PutMapping("/edit")
    public ResponseEntity<String> editMark(@RequestParam("id") Long id, @RequestBody MarkDto request) throws Exception {
        return ResponseEntity.ok(markService.editMark(id, request));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMark(@RequestParam("id") Long id) throws Exception {
        return ResponseEntity.ok(markService.deleteMark(id));
    }

    @GetMapping("/")
    public ResponseEntity<List<MarkDto>> getMarkList() {
        return ResponseEntity.ok(markService.getMarkList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MarkDto> getMark(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(markService.getMark(id));
    }

}
