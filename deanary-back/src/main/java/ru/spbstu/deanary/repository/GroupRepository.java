package ru.spbstu.deanary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.spbstu.deanary.model.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
}
