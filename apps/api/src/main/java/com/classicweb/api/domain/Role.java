package com.classicweb.api.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    GUEST("ROLE_GUEST", "손님"), // 소셜 로그인만 한 상태 (추가 정보 입력 필요)
    USER("ROLE_USER", "일반 사용자"); // 가입 완료

    private final String key;
    private final String title;
}