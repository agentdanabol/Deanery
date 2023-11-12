package ru.spbstu.deanary.dto;

public record UserDto(
        Long id,
        String username,
        String password,
        String firstname,
        String fathername,
        String lastname,
        Long group,
        String type
)
{}
