package ru.spbstu.deanary.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.spbstu.deanary.dto.SubjectDto;
import ru.spbstu.deanary.model.Subject;
import ru.spbstu.deanary.repository.SubjectRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SubjectService {

    private SubjectRepository subjectRepository;

    public Long createSubject(SubjectDto request) {
        Subject subject = Subject.builder()
                .name(request.name())
                .build();
        subjectRepository.save(subject);
        return subject.getId();
    }

    public SubjectDto getSubject(Long id) throws Exception {
        var subject = subjectRepository.findById(id)
                .orElseThrow(() -> new Exception("Subject not found"));
        return new SubjectDto(subject.getId(), subject.getName());
    }

    public String editSubject(Long id, SubjectDto request) throws Exception {
        var subject = subjectRepository.findById(id)
                .orElseThrow(() -> new Exception("Subject not found"));
        subject.setName(request.name());
        subjectRepository.save(subject);
        return "Success";
    }

    public String deleteSubject(Long id) throws Exception {
        var subject = subjectRepository.findById(id)
                .orElseThrow(() -> new Exception("Subject not found"));
        subjectRepository.delete(subject);
        return "Success";
    }

    public List<SubjectDto> getSubjectList() {
        List<Subject> subjectList = subjectRepository.findAll();
        return subjectList.stream().map(e -> new SubjectDto(e.getId(), e.getName())).collect(Collectors.toList());
    }

}
