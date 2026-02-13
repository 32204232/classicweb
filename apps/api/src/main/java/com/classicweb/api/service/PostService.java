package com.classicweb.api.service;

import com.classicweb.api.domain.Part; // ★ import 추가
import com.classicweb.api.domain.Post;
import com.classicweb.api.domain.PostCategory; // ★ import 추가
import com.classicweb.api.domain.User;
import com.classicweb.api.dto.PostCreateRequest;
import com.classicweb.api.repository.PostRepository;
import com.classicweb.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import java.util.List; // ★ import 추가

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 게시글 작성
    @Transactional
    public Long createPost(String userEmail, PostCreateRequest request) {
        // ... (기존 작성 코드 유지) ...
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Post post = Post.builder()
                .user(user)
                .title(request.getTitle())
                .content(request.getContent())
                .category(request.getCategory())
                .recruitPart(request.getRecruitPart())
                .region(request.getRegion())
                .fee(request.getFee())
                .contactType(request.getContactType())
                .contactValue(request.getContactValue())
                .eventDate(request.getEventDate()) 
                .targetCount(request.getTargetCount()) 
                .isUrgent(request.getIsUrgent() != null && request.getIsUrgent()) // getIsUrgent 오타 수정
                .build();

        return postRepository.save(post).getId();
    }

    // ★ [누락된 부분] 리스트 조회 메서드 추가!
    public List<Post> getPosts(Part part, PostCategory category) {
        if (part != null) {
            return postRepository.findByRecruitPartOrderByCreatedAtDesc(part);
        }
        if (category != null) {
            return postRepository.findByCategoryOrderByCreatedAtDesc(category);
        }
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    // 단건 조회
    public Post getPost(Long postId) {
        return postRepository.findById(postId)
            .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
    }

    public List<Post> getMyPosts(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new IllegalArgumentException("유저가 없습니다."));

                    return postRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }
}