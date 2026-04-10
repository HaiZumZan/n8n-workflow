package com.example.KBAn8n.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id // ĐÁNH DẤU ĐÂY LÀ KHÓA CHÍNH
    @GeneratedValue(strategy = GenerationType.IDENTITY) // TỰ ĐỘNG TĂNG ID TRONG MYSQL (AUTO_INCREMENT)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String role;
}