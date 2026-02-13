package com.classicweb.api.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "matchings", uniqueConstraints = {
    // 한 사람이 같은 글에 중복 지원 못 하게 막는 DB 제약조건 (중요!)
    @UniqueConstraint(columnNames = {"post_id", "user_id"})
})
public class Matching {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 어느 글에 지원했니?
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    // 지원자가 누구니?
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 현재 상태 (대기/수락/거절)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MatchingStatus status;

    // 간단한 지원 메시지 ("저 이대 반주과인데 시간 맞아요!")
    private String message;

    private LocalDateTime createdAt; // 지원 시간

    @Builder
    public Matching(Post post, User user, String message) {
        this.post = post;
        this.user = user;
        this.message = message;
        this.status = MatchingStatus.WAITING; // 기본은 대기중
        this.createdAt = LocalDateTime.now();
    }

    // 상태 변경 메서드 (수락/거절용)
    public void updateStatus(MatchingStatus newStatus) {
        this.status = newStatus;
    }
}