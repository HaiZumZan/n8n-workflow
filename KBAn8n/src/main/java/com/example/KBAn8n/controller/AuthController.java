package com.example.KBAn8n.controller;

import com.example.KBAn8n.dto.AuthResponse;
import com.example.KBAn8n.dto.LoginRequest;
import com.example.KBAn8n.entity.User;
import com.example.KBAn8n.repository.UserRepository;
import com.example.KBAn8n.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
 // <-- Thêm cái này để nó tự tạo Constructor cho các biến 'final'
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            String token = jwtUtils.generateToken(user.getUsername(), user.getRole());
            return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
        }

        return ResponseEntity.status(401).body("Sai mật khẩu");
    }
}