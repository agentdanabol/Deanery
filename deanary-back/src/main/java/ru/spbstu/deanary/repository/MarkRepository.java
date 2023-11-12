package ru.spbstu.deanary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.spbstu.deanary.model.Mark;

@Repository
public interface MarkRepository extends JpaRepository<Mark, Long> {
}
