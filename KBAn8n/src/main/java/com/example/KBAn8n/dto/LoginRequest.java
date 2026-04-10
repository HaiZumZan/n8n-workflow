package com.example.KBAn8n.dto;

import lombok.Data;

@Data // Tự động tạo Getter, Setter nhờ Lombok
public class LoginRequest {
    private String username;
    private String password;
}