package com.classicweb.api.repository;

import com.classicweb.api.domain.User;
import org.springframework.data.jpa.repository.JpaRepository; // sql db를 쓸 수 있게 만드는
import java.util.Optional; // NullpointEx 오류 피하기 위한 

public interface UserRepository extends JpaRepository<User, Long> {
    //1. 일반 로그인용: 이메일로 사람 찾기
    Optional<User> findByEmail(String email);

    //2. 중복 가입 방지
    boolean existsByEmail(String email);

    //3. 닉네임 중복 검사
    boolean existsByNickname(String nickname);
   
}
