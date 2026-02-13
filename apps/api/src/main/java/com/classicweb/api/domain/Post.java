package com.classicweb.api.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "posts")
public class Post {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PostCategory category;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostPart> recruitedParts = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Region region;

    private String fee;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContactType contactType;

    @Column(nullable = false)
    private String contactValue;

    private String writerEmail;

    // ✅ [수정 1] 상시 모집일 수 있으므로 nullable = true (또는 생략)
    @Column(nullable = true) 
    private LocalDateTime eventDate;

    // ✅ [확인] 목표 인원
    @Column(nullable = false)
    private Integer targetCount;

    // ✅ [추가] 현재 수락된 인원 (0명부터 시작)
    @Column(nullable = false)
    private int currentCount = 0; 

    @Enumerated(EnumType.STRING)
    private PostStatus status;
    
    @Column(nullable = true)
    private LocalDateTime createdAt;

    private boolean isUrgent;

    @Builder
    public Post(
            User user, String title, String content, PostCategory category,
            Part recruitPart, Region region, String fee,
            ContactType contactType, String contactValue,
            LocalDateTime eventDate, Integer targetCount, boolean isUrgent
    ) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.category = category;
        this.region = region;
        this.fee = fee;
        this.contactType = contactType;
        this.contactValue = contactValue;
        
        this.eventDate = eventDate; // null이면 상시모집
        // 목표 인원 없으면 기본 1명
        this.targetCount = (targetCount != null && targetCount > 0) ? targetCount : 1;
        this.currentCount = 0; // 생성 시엔 0명
        
        this.isUrgent = isUrgent;
        this.status = PostStatus.RECRUITING;
        this.createdAt = LocalDateTime.now();
    }

    // ✅ [추가] 매칭 수락 시 인원 증가 로직
    public void increaseCurrentCount() {
        this.currentCount++;
        if (this.currentCount >= this.targetCount) {
            this.status = PostStatus.COMPLETED; // 다 찼으면 마감!
        }
    }

    public void update(String title, String content, String fee,
                       ContactType contactType, Region region,
                       LocalDateTime eventDate, Integer targetCount) {
        this.title = title;
        this.content = content;
        this.fee = fee;
        this.contactType = contactType;
        this.region = region;
        this.eventDate = eventDate;
        this.targetCount = targetCount;
    }

    public void closeRecruitment() {
        this.status = PostStatus.COMPLETED;
    }
    public void addPart(PostPart postPart) {
        this.recruitedParts.add(postPart);
        postPart.setPost(this);
    }
}