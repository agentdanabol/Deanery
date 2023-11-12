package ru.spbstu.deanary.service;

import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import ru.spbstu.deanary.model.Mark;
import ru.spbstu.deanary.model.User;
import ru.spbstu.deanary.repository.MarkRepository;
import ru.spbstu.deanary.repository.UserRepository;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor
public class ExportService {

    private final UserRepository userRepository;
    private final MarkRepository markRepository;

    public byte[] getTables() throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        XSSFWorkbook workbook = new XSSFWorkbook();

        List<User> users = userRepository.findAll();
        XSSFSheet sheet1 = workbook.createSheet("People");
        int rownum = 0;
        for (User entity : users) {
            Row row = sheet1.createRow(rownum++);
            row.createCell(0).setCellValue(entity.getId());
            row.createCell(1).setCellValue(entity.getUsername());
            row.createCell(2).setCellValue(entity.getPassword());
            row.createCell(3).setCellValue(entity.getLastName());
            row.createCell(4).setCellValue(entity.getFirstName());
            row.createCell(5).setCellValue(entity.getFatherName());
            row.createCell(6).setCellValue(entity.getType());
            row.createCell(7).setCellValue((entity.getGroup() != null ? entity.getGroup().getName() : "-"));
        }

        List<Mark> marks = markRepository.findAll();
        XSSFSheet sheet2 = workbook.createSheet("Marks");
        rownum = 0;
        for (Mark entity : marks) {
            Row row = sheet2.createRow(rownum++);
            row.createCell(0).setCellValue(entity.getId());
            row.createCell(1).setCellValue(entity.getStudent().getUsername());
            row.createCell(2).setCellValue(entity.getSubject().getName());
            row.createCell(3).setCellValue(entity.getTeacher().getUsername());
        }

        workbook.write(byteArrayOutputStream);
        byteArrayOutputStream.close();
        return byteArrayOutputStream.toByteArray();
    }
}
