package ru.spbstu.deanary.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ru.spbstu.deanary.dto.GroupDto;
import ru.spbstu.deanary.model.Group;
import ru.spbstu.deanary.repository.GroupRepository;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class GroupService {

    private final GroupRepository groupRepository;

    public Long createGroup(GroupDto request) {
        Group group = Group.builder()
                .name(request.name())
                .year(request.year())
                .build();
        groupRepository.save(group);
        return group.getId();
    }

    public String editGroup(Long id, GroupDto request) throws Exception {
        var group = groupRepository.findById(id)
                .orElseThrow(() -> new Exception("Group not found"));
        group.setName(request.name());
        group.setYear(request.year());
        groupRepository.save(group);
        return "Success";
    }

    public String deleteGroup(Long id) throws Exception {
        var group = groupRepository.findById(id)
                .orElseThrow(() -> new Exception("Group not found"));
        groupRepository.delete(group);
        return "Success";
    }

    public List<GroupDto> getGroupList() {
        List<Group> groupList = groupRepository.findAll();
        return groupList.stream().map(e -> new GroupDto(e.getId(), e.getName(), e.getYear())).collect(Collectors.toList());
    }

    public GroupDto getGroup(Long id) throws Exception {
        var group = groupRepository.findById(id)
                .orElseThrow(() -> new Exception("Group not found"));
        return new GroupDto(group.getId(), group.getName(), group.getYear());
    }

}
