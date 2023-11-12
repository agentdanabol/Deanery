package ru.spbstu.deanary.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.deanary.dto.GroupDto;
import ru.spbstu.deanary.service.GroupService;

import java.util.List;

@RestController
@RequestMapping("api/v1/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping("/create")
    public ResponseEntity<Long> createGroup(@RequestBody GroupDto request) {
        return ResponseEntity.ok(groupService.createGroup(request));
    }

    @PutMapping("/edit")
    public ResponseEntity<String> editGroup(@RequestParam("id") Long id, @RequestBody GroupDto request) throws Exception {
        return ResponseEntity.ok(groupService.editGroup(id, request));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteGroup(@RequestParam("id") Long id) throws Exception {
        return ResponseEntity.ok(groupService.deleteGroup(id));
    }

    @GetMapping("/")
    public ResponseEntity<List<GroupDto>> getGroupList() {
        return ResponseEntity.ok(groupService.getGroupList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupDto> getGroup(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(groupService.getGroup(id));
    }
}
