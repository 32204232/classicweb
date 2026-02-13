package com.classicweb.api.service;

import com.classicweb.api.domain.User;
import com.classicweb.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;


    // 2. ★ 휴대폰 인증 완료 처리 (GUEST -> USER 승격)
    @Transactional
    public void verifyUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("유저가 없습니다."));
        
        user.upgradeToUser(); // 엔티티의 승격 메서드 호출
    }

    // 2. 닉네임 변경 (30일 제한)
    @Transactional
    public void changeNickname(String email, String newNickname) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("유저가 없습니다."));

        // 중복 체크
        if (userRepository.existsByNickname(newNickname)) {
             throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        // 30일 쿨타임 체크
        long daysBetween = ChronoUnit.DAYS.between(user.getNicknameUpdatedAt(), LocalDateTime.now());
        if (daysBetween < 30) {
            throw new IllegalArgumentException("닉네임은 30일마다 변경할 수 있습니다. (" + (30 - daysBetween) + "일 남음)");
        }

        user.updateNickname(newNickname);
    }
}