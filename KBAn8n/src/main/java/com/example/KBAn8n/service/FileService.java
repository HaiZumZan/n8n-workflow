package com.example.KBAn8n.service;

import com.example.KBAn8n.entity.FileMetadata;
import com.example.KBAn8n.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileService {
    private final FileRepository fileRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    // SỬA: Lấy file của mình HOẶC file công khai
    public List<FileMetadata> getFilesForUser(String username, boolean isAdmin) {
        if (isAdmin || "admin".equals(username)) {
            return fileRepository.findAll();
        }

        // Lấy tất cả và lọc (Hoặc Hoa dùng query trong Repository đã tạo ở bước trước)
        return fileRepository.findAll().stream()
                .filter(f -> f.getOwnerUsername().equals(username) || f.isGlobal())
                .collect(Collectors.toList());
    }

    public void deleteFile(Long id, String username, boolean isAdmin) {
        FileMetadata file = fileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File không tồn tại"));

        // Kiểm tra quyền
        if (!isAdmin && !"admin".equals(username) && !file.getOwnerUsername().equals(username)) {
            throw new RuntimeException("Bạn không có quyền xóa file của người khác!");
        }

        try {
            // ✅ CẬP NHẬT: Dùng đúng URL ngrok từ ảnh n8n của Hoa
            String n8nUrl = "https://cornell-unpugilistic-dorsoventrally.ngrok-free.dev/webhook-test/upload-document";

            String url = UriComponentsBuilder.fromHttpUrl(n8nUrl)
                    .queryParam("task", "delete")
                    .queryParam("file_name", file.getFileName())
                    .queryParam("owner_username", file.getOwnerUsername())
                    .toUriString();

            System.out.println("--- [DEBUG] Đang gọi n8n để xóa tài liệu: " + file.getFileName());

            // Gửi yêu cầu POST sang n8n
            restTemplate.postForEntity(url, null, String.class);

            // Xóa dòng quản lý trong bảng file_metadata
            fileRepository.delete(file);

        } catch (Exception e) {
            // Log lỗi chi tiết ra console để Hoa dễ theo dõi
            System.err.println("Lỗi kết nối n8n: " + e.getMessage());
            throw new RuntimeException("Không thể gọi n8n để xóa dữ liệu AI. Vui lòng kiểm tra ngrok!");
        }
    }
}