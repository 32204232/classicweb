package com.classicweb.api.controller;


import com.classicweb.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    // Enum 데이터 제공
    @GetMapping("/parts")
    public ResponseEntity<com.classicweb.api.domain.Part[]> getParts() {
        return ResponseEntity.ok(com.classicweb.api.domain.Part.values());
    }

    @GetMapping("/regions")
    public ResponseEntity<com.classicweb.api.domain.Region[]> getRegions() {
        return ResponseEntity.ok(com.classicweb.api.domain.Region.values());
    }


    // 2. ★ [추가] 휴대폰 인증 완료 API (PATCH)
    @PatchMapping("/verify/phone")
    public ResponseEntity<String> verifyPhone(
            @AuthenticationPrincipal String userEmail
    ) {
        userService.verifyUser(userEmail);
        return ResponseEntity.ok("본인 인증이 완료되었습니다! 정회원으로 승격되었습니다.");
    }
    
    // 닉네임 변경 API
    @PatchMapping("/nickname")
    public ResponseEntity<String> updateNickname(
            @AuthenticationPrincipal String userEmail,
            @RequestBody Map<String, String> body
    ) {
        String newNickname = body.get("nickname");
        userService.changeNickname(userEmail, newNickname);
        return ResponseEntity.ok("닉네임이 변경되었습니다.");
    }
}