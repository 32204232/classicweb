package com.classicweb.api.dto;

import com.classicweb.api.domain.Matching;
import com.classicweb.api.domain.Post;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.io.Serializable;

@Data
public class MatchingApplicantResponse implements Serializable {
    private final Long matchingId;
    private final Long postId;
    private final UserSimpleResponse applicant;
    private final String status;
    private final String applicantMessage;
    private final LocalDateTime appliedAt;

    private final PostInfo post;
    @Data
    @RequiredArgsConstructor
    public static class PostInfo implements Serializable {
        private final Long id;
        private final String title;
        private final String contactType;
        private final String contactValue;
    }

   public static MatchingApplicantResponse fromEntity(Matching matching) {
        Post p = matching.getPost();
        
        return new MatchingApplicantResponse(
            matching.getId(),
            p.getId(),
            UserSimpleResponse.fromEntity(matching.getUser()), 
            matching.getStatus().name(),
            matching.getMessage(),
            matching.getCreatedAt(),
            // ★ PostInfo 생성 및 주입
            new PostInfo(
                p.getId(),
                p.getTitle(),
                p.getContactType().name(),
                p.getContactValue()
            )
        );
    }
}