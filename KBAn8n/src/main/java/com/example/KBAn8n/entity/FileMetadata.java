package com.example.KBAn8n.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "file_metadata") // BẮT BUỘC: Để khớp với tên bảng Supabase
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileMetadata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "owner_username")
    private String ownerUsername;

    @Column(name = "is_global") // BẮT BUỘC: Khớp cột is_global trong DB
    private boolean isGlobal;

    @Column(name = "upload_date")
    private LocalDateTime uploadDate;
}