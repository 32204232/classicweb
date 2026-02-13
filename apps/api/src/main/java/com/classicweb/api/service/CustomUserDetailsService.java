package com.classicweb.api.service;

import com.classicweb.api.domain.User;
import com.classicweb.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        // UserDetails 객체 생성 및 반환
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                "UNUSED", // ★ [수정] user.getPassword() 대신 아무 문자열이나 넣으세요!
                Collections.emptyList() // 권한 목록
        );
    }
}