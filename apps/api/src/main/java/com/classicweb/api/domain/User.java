package com.classicweb.api.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    private String provider; // kakao, naver

    @Column(unique = true)
    private String nickname;

    // ★ DB 에러 방지를 위해 기본값이 꼭 필요함
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Part part;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Region region;

    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private LocalDateTime nicknameUpdatedAt;

    // ★ [수정됨] Builder 생성자: 모든 필수 필드를 받도록 수정 + 안전장치 추가
    @Builder
    public User(String email, String name, String provider, Role role, String profileImageUrl, String nickname, Part part, Region region) {
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.profileImageUrl = profileImageUrl;
        this.nickname = nickname;
        
        // [안전장치] 값이 안 들어오면 기본값으로 설정 (Null 방지)
        this.role = (role != null) ? role : Role.GUEST; 
        this.part = (part != null) ? part : Part.NONE;
        this.region = (region != null) ? region : Region.NONE;
        
        this.nicknameUpdatedAt = LocalDateTime.now();
    }

    // 1. 정보 입력 (닉네임/파트/지역 저장 - Role 변경 안 함)
    public void registerInfo(String nickname, Part part, Region region) {
        this.nickname = nickname;
        this.part = part;
        this.region = region;
        this.nicknameUpdatedAt = LocalDateTime.now();
    }

    // 2. 휴대폰 인증 성공 시 (여기서 USER로 승격!)
    public void upgradeToUser() {
        this.role = Role.USER;
    }

    // 3. 닉네임 변경
    public void updateNickname(String newNickname) {
        this.nickname = newNickname;
        this.nicknameUpdatedAt = LocalDateTime.now();
    }
}