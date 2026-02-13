package com.classicweb.api.controller;

import com.classicweb.api.domain.Part;
import com.classicweb.api.domain.Post;
import com.classicweb.api.domain.PostCategory;
import com.classicweb.api.dto.PostCreateRequest;
import com.classicweb.api.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.classicweb.api.dto.PostListResponse;
import java.util.stream.Collectors;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // 1. 글쓰기 (POST)
    @PostMapping
    public ResponseEntity<String> createPost(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody @Valid PostCreateRequest request
    ) {
        String userEmail = userDetails.getUsername();
        Long postId = postService.createPost(userEmail, request);
        return ResponseEntity.ok("게시글 작성 완료! (ID: " + postId + ")");
    }

    // ★ [누락된 부분 복구] 2. 목록 조회 (GET)
   @GetMapping
    public ResponseEntity<List<PostListResponse>> getPosts( // ★ 타입 변경
            @RequestParam(required = false) Part part,
            @RequestParam(required = false) PostCategory category) {
        
        List<Post> posts = postService.getPosts(part, category);
        List<PostListResponse> responseList = posts.stream()
                .map(PostListResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseList);
    }
    
    // ★ [누락된 부분 복구] 3. 상세 조회 (GET /api/posts/{id})
    @GetMapping("/{postId}")
    public ResponseEntity<PostListResponse> getPost(@PathVariable Long postId) { // ★ 타입 변경
        Post post = postService.getPost(postId);
        return ResponseEntity.ok(PostListResponse.fromEntity(post));
    }

    @GetMapping("/me")
    public ResponseEntity<List<PostListResponse>> getMyPosts(@AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();
        List<Post> posts = postService.getMyPosts(userEmail);

        List<PostListResponse> responseList = posts.stream()
                .map(PostListResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseList);
    }
    
}