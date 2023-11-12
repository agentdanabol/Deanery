package ru.spbstu.deanary.service;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.spbstu.deanary.dto.UserDto;
import ru.spbstu.deanary.model.Group;
import ru.spbstu.deanary.model.User;
import ru.spbstu.deanary.repository.GroupRepository;
import ru.spbstu.deanary.repository.UserRepository;
import ru.spbstu.deanary.security.JwtTokenProvider;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;

    public String register(UserDto request) throws Exception {
        User user = User.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .firstName(request.firstname())
                .lastName(request.lastname())
                .fatherName(request.fathername())
                .type(request.type())
                .build();
        if(request.group() != null) {
            Group group =  groupRepository.findById(request.group())
                    .orElseThrow(() -> new Exception("Group not found"));
            user.setGroup(group);
        }

        userRepository.save(user);
        return jwtTokenProvider.generateToken(user);
    }

    public String login(UserDto request) throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );
        var user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new Exception("User not found"));
        return jwtTokenProvider.generateToken(user);
    }

    public List<UserDto> getUserList() {
        List<User> userList = userRepository.findAll();
        return userList.stream().map(user -> new UserDto(user.getId(), user.getUsername(), null, user.getFirstName(), user.getFatherName(),
                user.getLastName(), (user.getGroup() != null ? user.getGroup().getId() : 0L), user.getType())).collect(Collectors.toList());
    }

    public UserDto getUser(Long id) throws Exception {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new Exception("Mark not found"));
        return new UserDto(user.getId(), user.getUsername(), null, user.getFirstName(), user.getFatherName(),
                user.getLastName(), (user.getGroup() != null ? user.getGroup().getId() : 0L), user.getType());
    }

    public String editUser(Long id, UserDto request) throws Exception {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new Exception("Mark not found"));
        user.setFirstName(request.firstname());
        user.setLastName(request.lastname());
        userRepository.save(user);
        return "Success";
    }
}
