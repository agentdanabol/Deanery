package ru.spbstu.deanary.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.spbstu.deanary.dto.UserDto;
import ru.spbstu.deanary.service.UserService;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDto userRequest) throws Exception {
        return ResponseEntity.ok(userService.register(userRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto request) throws Exception {
        return ResponseEntity.ok(userService.login(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> editUser(@PathVariable("id") Long id, @RequestBody UserDto request) throws Exception {
        return ResponseEntity.ok(userService.editUser(id, request));
    }

    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getUserList() {
        return ResponseEntity.ok(userService.getUserList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable("id") Long id) throws Exception {
        return ResponseEntity.ok(userService.getUser(id));
    }

}
