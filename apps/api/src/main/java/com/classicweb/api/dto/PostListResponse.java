package com.classicweb.api.dto;

import com.classicweb.api.domain.Post;
import com.classicweb.api.domain.PostCategory;
import com.classicweb.api.domain.PostStatus;
import com.classicweb.api.domain.Region; // Region 임포트 필요
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder // ★ 1. 이게 있어야 .builder()를 쓸 수 있습니다.
@AllArgsConstructor // 빌더 패턴 사용 시 전체 생성자가 필요합니다.
@NoArgsConstructor  // JSON 변환 등을 위해 기본 생성자도 있는 게 좋습니다.
public class PostListResponse {
    
    private Long id;
    private String title;
    private List<String> recruitedParts;
    private Region region; // ★ 2. Post의 region이 Enum이므로 타입 일치시킴 (String으로 할 거면 .name() 필요)
    private PostStatus status;
    private PostCategory category;
    
    // 작성자 정보 (닉네임 대신 일단 이메일로 매핑하셨으니 이름도 맞춤)
    private String writerEmail; 
    
    // ★ 3. builder()에서 createdAt을 넣고 있어서 필드가 꼭 있어야 합니다.
    private LocalDateTime createdAt; 

    public static PostListResponse fromEntity(Post post) {
        // 악기 목록 문자열 변환
        List<String> partInfo = post.getRecruitedParts().stream()
                .map(pp -> pp.getPart().name() + " (" + pp.getCount() + "명)")
                .collect(Collectors.toList());

        return PostListResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .writerEmail(post.getWriterEmail()) // ★ 필드명 일치 (writerEmail)
                .category(post.getCategory())
                .region(post.getRegion())       // ★ 타입 일치 (Region)
                .recruitedParts(partInfo)
                .createdAt(post.getCreatedAt()) // ★ 필드 추가됨
                .status(post.getStatus())
                .build();
    }
}