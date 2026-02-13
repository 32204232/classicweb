package com.classicweb.api.service;

import com.classicweb.api.domain.Part; // ★ import 추가
import com.classicweb.api.domain.Post;
import com.classicweb.api.domain.PostCategory; // ★ import 추가
import com.classicweb.api.domain.PostPart;
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
    public Long createPost(String email, PostCreateRequest request) {
        // 1. 게시글 본체 생성
        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                //.writerEmail(email)
                .category(request.getCategory())
                .region(request.getRegion())
                .build();

        // 2. 모집 악기들(PostPart) 생성 및 연결
        if (request.getParts() != null) {
            for (PostCreateRequest.RecruitPartDto partDto : request.getParts()) {
                PostPart postPart = PostPart.builder()
                        .part(partDto.getPart())
                        .count(partDto.getCount())
                        .build();
                post.addPart(postPart); // Post에 추가 (Cascade로 자동 저장됨)
            }
        }

        return postRepository.save(post).getId();
    }

// 목록 조회 로직 수정
    public List<Post> getPosts(Part part, PostCategory category) {
        if (part != null && category != null) {
            return postRepository.findDistinctByRecruitedParts_PartAndCategory(part, category);
        } else if (part != null) {
            return postRepository.findDistinctByRecruitedParts_Part(part);
        } else if (category != null) {
            return postRepository.findByCategory(category);
        } else {
            return postRepository.findAll();
        }
    }

    // 단건 조회
    public Post getPost(Long postId) {
        return postRepository.findById(postId)
            .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
    }

    public List<Post> getMyPosts(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new IllegalArgumentException("유저가 없습니다."));

                    return postRepository.findByWriterEmailOrderByCreatedAtDesc(userEmail);
    }
}