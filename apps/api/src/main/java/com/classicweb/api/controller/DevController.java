package com.classicweb.api.controller;

import com.classicweb.api.domain.Part;
import com.classicweb.api.domain.Region;
import com.classicweb.api.domain.Role;
import com.classicweb.api.domain.User;
import com.classicweb.api.repository.UserRepository;
import com.classicweb.api.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/dev")
@RequiredArgsConstructor
public class DevController {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    // 개발용 프리패스 로그인
    // POST /api/dev/login
    // Body: { "email": "test1@tutti.com" }
    @PostMapping("/login")
    public ResponseEntity<String> devLogin(@RequestBody Map<String, String> body) {
        String email = body.get("email");

        // 1. 유저가 없으면 가짜로 만듦
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    return userRepository.save(User.builder()
                            .email(email)
                            .name("테스트유저")
                            .provider("dev")
                            .role(Role.USER) // 바로 정회원 등극!
                            .nickname("테스터_" + email.split("@")[0]) // 닉네임 자동생성
                            .part(Part.PIANO) // 기본값
                            .region(Region.SEOUL) // 기본값
                            .profileImageUrl("https://placehold.co/100") // 가짜 이미지
                            .build());
                });

        // 2. 토큰 발급
        String token = jwtTokenProvider.createToken(user.getEmail());
        
        return ResponseEntity.ok(token);
    }
}