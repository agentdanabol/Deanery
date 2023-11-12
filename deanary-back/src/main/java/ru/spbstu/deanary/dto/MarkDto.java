package ru.spbstu.deanary.dto;

public record MarkDto(
        Long id,
        int value,
        Long subject,
        Long student,
        Long teacher
) {

}
