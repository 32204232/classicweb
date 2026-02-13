package com.classicweb.api.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostPart {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Enumerated(EnumType.STRING)
    private Part part; // 악기 이름 (예: VIOLIN)

    private int count; // 모집 인원 (예: 2명)

    @Builder
    public PostPart(Post post, Part part, int count) {
        this.post = post;
        this.part = part;
        this.count = count;
    }
    
    // 편의 메서드: Post와 연결 설정
    public void setPost(Post post) {
        this.post = post;
    }
}