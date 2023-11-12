package ru.spbstu.deanary.controller;


import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.spbstu.deanary.service.ExportService;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/export")
public class ExportController {

    private final ExportService exportService;

    public ExportController(ExportService exportService) {
        this.exportService = exportService;
    }

    @GetMapping("/xls")
    public ResponseEntity<byte[]> exportToXls() throws IOException {
        byte[] xlsBytes = exportService.getTables();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "export.xls");

        return new ResponseEntity<>(xlsBytes, headers, HttpStatus.OK);
    }

}
