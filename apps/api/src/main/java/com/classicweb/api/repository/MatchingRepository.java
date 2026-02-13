package com.classicweb.api.repository;

import com.classicweb.api.domain.Matching;
import com.classicweb.api.domain.Post;
import com.classicweb.api.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface MatchingRepository extends JpaRepository<Matching, Long> {

    // 1. 중복 지원 방지용 (핵심!)
    // "이 글(Post)에 이 유저(User)가 이미 지원했니?" -> true/false
    boolean existsByPostAndUser(Post post, User user);

    // 2. [방장용] 내 글에 지원한 사람 리스트 보기 (최신순)
    List<Matching> findAllByPostOrderByCreatedAtDesc(Post post);

    // 3. [지원자용] 내가 지원한 내역 모아보기 (마이페이지용)
    List<Matching> findAllByUserOrderByCreatedAtDesc(User user);
    
    // 4. 특정 매칭 정보 가져오기 (수락/거절할 때 사용)
    // 매칭 ID로 찾되, Post 정보까지 한 번에 가져오기 (Fetch Join 최적화는 나중에, 일단 기본 조회)
}