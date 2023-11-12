package ru.spbstu.deanary.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.spbstu.deanary.dto.MarkDto;
import ru.spbstu.deanary.model.Mark;
import ru.spbstu.deanary.model.Subject;
import ru.spbstu.deanary.model.User;
import ru.spbstu.deanary.repository.MarkRepository;
import ru.spbstu.deanary.repository.SubjectRepository;
import ru.spbstu.deanary.repository.UserRepository;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class MarkService {

    private final MarkRepository markRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;

    public Long createMark(MarkDto request) throws Exception {
        Subject subject =  subjectRepository.findById(request.subject())
                .orElseThrow(() -> new Exception("Subject not found"));
        User student = userRepository.findById(request.student())
                .orElseThrow(() -> new Exception("Student not found"));
        User teacher = userRepository.findById(request.teacher())
                .orElseThrow(() -> new Exception("Teacher not found"));

        if(!Objects.equals(student.getType(), "Студент") || !Objects.equals(teacher.getType(), "Преподаватель")) {
            throw new Exception("Wrong person assignment");
        }

        Mark mark = Mark.builder()
                .value(request.value())
                .subject(subject)
                .student(student)
                .teacher(teacher)
                .build();
        markRepository.save(mark);
        return mark.getId();
    }

    public String editMark(Long id, MarkDto request) throws Exception {
        var mark = markRepository.findById(id)
                .orElseThrow(() -> new Exception("Mark not found"));
        mark.setValue(request.value());
        markRepository.save(mark);
        return "Success";
    }

    public String deleteMark(Long id) throws Exception {
        var mark = markRepository.findById(id)
                .orElseThrow(() -> new Exception("Mark not found"));
        markRepository.delete(mark);
        return "Success";
    }

    public List<MarkDto> getMarkList() {
        List<Mark> subjectList = markRepository.findAll();
        return subjectList.stream().map(e -> new MarkDto(e.getId(), e.getValue(), e.getSubject().getId(),
                e.getStudent().getId(), e.getTeacher().getId())).collect(Collectors.toList());
    }

    public MarkDto getMark(Long id) throws Exception {
        var mark = markRepository.findById(id)
                .orElseThrow(() -> new Exception("Mark not found"));
        return new MarkDto(mark.getId(), mark.getValue(), mark.getSubject().getId(),
                mark.getStudent().getId(), mark.getTeacher().getId());
    }

}
