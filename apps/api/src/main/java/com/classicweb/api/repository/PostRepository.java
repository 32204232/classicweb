package com.classicweb.api.repository;

import com.classicweb.api.domain.Part;
import com.classicweb.api.domain.Post;
import com.classicweb.api.domain.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    
    // 1. 카테고리 + 악기 필터링
    // "Post의 recruitedParts 리스트 중에 part가 일치하는 녀석이 하나라도 있으면 가져와라"
    List<Post> findDistinctByRecruitedParts_PartAndCategory(Part part, PostCategory category);

    // 2. 악기만 필터링
    List<Post> findDistinctByRecruitedParts_Part(Part part);

    // 3. 카테고리만 필터링 (기존 유지)
    List<Post> findByCategory(PostCategory category);

    List<Post> findByWriterEmailOrderByCreatedAtDesc(String writerEmail);
}