package ru.spbstu.deanary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.spbstu.deanary.model.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
}
