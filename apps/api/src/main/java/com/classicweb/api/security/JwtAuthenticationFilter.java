package com.classicweb.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserDetailsService userDetailsService;

    // ★ [추가] 로그인이나 인증 관련 주소는 필터를 거치지 않고 통과시킴 (무한 루프 방지)
    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/api/auth/") || path.startsWith("/login/oauth2/");
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        try {
            String token = resolveToken(request);

            if (token != null && jwtTokenProvider.validateToken(token)) {
                String userEmail = jwtTokenProvider.getUserId(token);
                
                // 유저 정보 가져오기
                UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
                
                // 인증 객체 생성
                UsernamePasswordAuthenticationToken auth = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                
                // 시큐리티 컨텍스트에 저장 (로그인 도장 쾅!)
                SecurityContextHolder.getContext().setAuthentication(auth);
                System.out.println("✅ [JWT Filter] 인증 성공: " + userEmail);
            } else {
                // 토큰이 없거나 유효하지 않음 (로그만 찍고 넘어감)
                 System.out.println("❌ [JWT Filter] 유효한 토큰 없음");
            }
        } catch (Exception e) {
            // ★ 에러가 나도 서버를 죽이지 않고 로그만 찍음
            System.err.println("⚠️ [JWT Filter] 에러 발생: " + e.getMessage());
        }

        // 다음 단계로 진행
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}