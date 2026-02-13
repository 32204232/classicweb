package com.classicweb.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test") // ★ 여기는 "/api/auth"가 아니므로 검사 대상입니다!
public class TestController {

    @GetMapping
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("🔒 인증 성공! 당신은 선택받은 사용자입니다.");
    }
}