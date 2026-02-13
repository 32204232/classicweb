package com.classicweb.api.dto;

import com.classicweb.api.domain.User;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import java.io.Serializable;

@Data
@RequiredArgsConstructor
public class UserSimpleResponse implements Serializable {
    private final Long userId;
    private final String nickname;
    private final String profileImageUrl; // 프로필 사진 추가
    private final String part; // 전공 추가 (String으로 반환)

    public static UserSimpleResponse fromEntity(User user) {
        return new UserSimpleResponse(
            user.getId(), 
            user.getNickname(), 
            user.getProfileImageUrl(),
            user.getPart() != null ? user.getPart().name() : null
        );
    }
}