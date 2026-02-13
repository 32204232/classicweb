package com.classicweb.api.repository;

import com.classicweb.api.domain.Part;
import com.classicweb.api.domain.Post;
import com.classicweb.api.domain.PostCategory;
import com.classicweb.api.domain.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    // 1. 최신순으로 전체 조회 (게시판 메인)
    // SQL: select * from posts order by created_at desc
    List<Post> findAllByOrderByCreatedAtDesc();

    // 2. 카테고리별 조회 (필터: 졸연만 보기, 레슨만 보기)
    List<Post> findByCategoryOrderByCreatedAtDesc(PostCategory category);

    // 3. 지역별 조회 (필터: 서울만 보기)
    List<Post> findByRegionOrderByCreatedAtDesc(Region region);
    
    // 4. 내 글 모아보기 (마이페이지용)
    List<Post> findByUserIdOrderByCreatedAtDesc(Long userId);
    // ★ [추가] 파트(악기)별로 최신순 조회
    List<Post> findByRecruitPartOrderByCreatedAtDesc(Part recruitPart);
}