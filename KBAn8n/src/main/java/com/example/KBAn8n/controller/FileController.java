package com.example.KBAn8n.controller;

import com.example.KBAn8n.entity.Document;
import com.example.KBAn8n.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final DocumentRepository documentRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("isGlobal") boolean isGlobal,
            Authentication authentication) throws IOException {

        // 1. Tạo thư mục lưu file nếu chưa có
        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdir();

        // 2. Lưu file vật lý
        String filePath = uploadDir + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        // 3. Lưu thông tin vào Database
        Document doc = new Document();
        doc.setFileName(file.getOriginalFilename());
        doc.setFilePath(filePath);
        doc.setOwnerUsername(authentication.getName()); // Lấy từ Token
        doc.setGlobal(isGlobal);
        documentRepository.save(doc);

        return ResponseEntity.ok("File uploaded thành công cho: " + authentication.getName());
    }
}