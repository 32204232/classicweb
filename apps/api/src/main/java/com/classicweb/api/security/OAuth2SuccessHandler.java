package com.classicweb.api.security;

import com.classicweb.api.domain.Role;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        
        // 이메일 꺼내기 (구글/카카오에 따라 다를 수 있으니 주의, 여기선 attributes에서 찾음)
        // OAuthAttributes 로직을 타서 통일된 email을 가져오는 게 안전함.
        // 편의상 principal의 attributes map에서 email을 찾는다고 가정.
        String email = (String) oAuth2User.getAttributes().get("email");
        if(email == null) {
             // 카카오의 경우 구조가 달라서 이렇게 꺼내야 할 수도 있음
             var kakaoAccount = (java.util.Map) oAuth2User.getAttributes().get("kakao_account");
             email = (String) kakaoAccount.get("email");
        }

        // 토큰 생성
        String token = jwtTokenProvider.createToken(email);

        // 권한 확인 (GUEST냐 USER냐)
        // 아까 CustomOAuth2UserService에서 authorities에 Role을 넣어줬음.
        boolean isGuest = oAuth2User.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(Role.GUEST.getKey()));

        if (isGuest) {
            // GUEST -> 본인 인증 페이지로 납치! (정보 입력 X)
            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/signup/verify") // ★ 주소 변경
                    .queryParam("token", token)
                    .build().toUriString();
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }else {
            // USER -> 메인으로 로그인 (토큰 들고 가라!)
            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/login/oauth/callback")
                    .queryParam("token", token)
                    .build().toUriString();
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
    }
}