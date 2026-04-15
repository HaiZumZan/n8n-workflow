// src/main/java/com/example/KBAn8n/repository/FileRepository.java
package com.example.KBAn8n.repository;

import com.example.KBAn8n.entity.FileMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FileRepository extends JpaRepository<FileMetadata, Long> {
    List<FileMetadata> findByOwnerUsername(String username);
    List<FileMetadata> findByIsGlobalTrue();
}