package com.classicweb.api.dto;

import com.classicweb.api.domain.Part;
import com.classicweb.api.domain.Region;
import com.classicweb.api.domain.Role;
import com.classicweb.api.domain.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;
import java.util.Random;

@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String profileImageUrl;
    private String provider;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String name, String email, String profileImageUrl, String provider) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.profileImageUrl = profileImageUrl;
        this.provider = provider;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        // ★ 네이버인지 확인
        if ("naver".equals(registrationId)) {
            return ofNaver("id", attributes);
        }
        // 카카오
        return ofKakao("id", attributes);
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        // ★ 네이버는 'response' 키 안에 실제 정보가 들어있음!
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuthAttributes.builder()
                .name((String) response.get("name"))
                .email((String) response.get("email"))
                .profileImageUrl((String) response.get("profile_image"))
                .provider("naver")
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        return OAuthAttributes.builder()
                .name((String) profile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .profileImageUrl((String) profile.get("profile_image_url"))
                .provider("kakao")
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    // 랜덤 닉네임 생성기
    private String generateRandomNickname() {
        String[] adjectives = {"즐거운", "행복한", "노래하는", "춤추는", "열정적인", "차분한", "신나는"};
        String[] animals = {"호랑이", "토끼", "다람쥐", "펭귄", "고양이", "강아지", "사자", "판다"};
        Random random = new Random();
        return adjectives[random.nextInt(adjectives.length)] + animals[random.nextInt(animals.length)] + (1000 + random.nextInt(9000));
    }

    public User toEntity() {
        return User.builder()
                .name(name)
                .email(email)
                .profileImageUrl(profileImageUrl)
                .nickname(generateRandomNickname()) // 랜덤 닉네임 부여
                .role(Role.GUEST) // 처음엔 무조건 손님
                .part(Part.NONE)
                .region(Region.NONE)
                .provider(provider)
                .build();
    }
}