package com.classicweb.api.dto;

import com.classicweb.api.domain.Post;
import com.classicweb.api.domain.PostCategory;
import com.classicweb.api.domain.PostStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PostListResponse {
    private Long id;
    private String title;
    private String recruitPart;
    private String region;
    private String fee;
    private PostStatus status;
    private LocalDateTime eventDate;
    private Integer targetCount;
    private int currentCount;
    private PostCategory category;
    
    // ★ 핵심: User 엔티티 대신 닉네임만! (Lazy Loading 회피)
    private String writerNickname; 

    public static PostListResponse fromEntity(Post post) {
        PostListResponse response = new PostListResponse();
        response.id = post.getId();
        response.title = post.getTitle();
        // Enum -> String 변환 (안전하게)
        response.recruitPart = post.getRecruitPart() != null ? post.getRecruitPart().name() : null;
        response.region = post.getRegion().name();
        response.fee = post.getFee();
        response.status = post.getStatus();
        response.eventDate = post.getEventDate();
        response.targetCount = post.getTargetCount();
        response.currentCount = post.getCurrentCount();
        response.category = post.getCategory();
        
        // ★ 여기서 getUser().getNickname()을 호출하면 프록시가 초기화되면서 진짜 데이터가 담김
        response.writerNickname = post.getUser().getNickname(); 
        
        return response;
    }
}