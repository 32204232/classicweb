package com.classicweb.api.controller;

import com.classicweb.api.dto.MatchingApplicantResponse;
import com.classicweb.api.dto.MatchingApplyRequest;
import com.classicweb.api.dto.MatchingDecisionRequest;
import com.classicweb.api.service.MatchingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails; // ★ import 추가
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matching")
@RequiredArgsConstructor
public class MatchingController {

    private final MatchingService matchingService;

    // 1. 지원하기
    @PostMapping
    public ResponseEntity<String> applyMatching(
            @AuthenticationPrincipal UserDetails userDetails, // ★ 수정됨
            @RequestBody @Valid MatchingApplyRequest request) {
        
        String userEmail = userDetails.getUsername(); // ★ 이메일 꺼내기
        Long matchingId = matchingService.applyMatching(userEmail, request);
        return ResponseEntity.ok("지원 완료! (매칭 번호: " + matchingId + ")");
    }

    // 2. 결정하기
    @PostMapping("/decision")
    public ResponseEntity<String> decideMatching(
            @AuthenticationPrincipal UserDetails userDetails, // ★ 수정됨
            @RequestBody @Valid MatchingDecisionRequest request) {
        
        String userEmail = userDetails.getUsername(); // ★ 이메일 꺼내기
        matchingService.decideMatching(userEmail, request);
        return ResponseEntity.ok("상태 변경이 완료되었습니다.");
    }

    // 3. 내 글에 지원한 사람 목록 보기 (방장용)
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<MatchingApplicantResponse>> getApplicants(
            @AuthenticationPrincipal UserDetails userDetails, // ★ 수정됨
            @PathVariable Long postId) {
        
        String userEmail = userDetails.getUsername(); // ★ 이메일 꺼내기
        List<MatchingApplicantResponse> applicants = matchingService.getApplicants(userEmail, postId);
        return ResponseEntity.ok(applicants);
    }

    // 4. 내가 지원한 목록 보기 (지원자용 - 마이페이지)
    @GetMapping("/me")
    public ResponseEntity<List<MatchingApplicantResponse>> getMyApplications(
            @AuthenticationPrincipal UserDetails userDetails) { // ★ 수정됨
        
        String userEmail = userDetails.getUsername(); // ★ 이메일 꺼내기
        List<MatchingApplicantResponse> myMatchings = matchingService.getMyApplications(userEmail);
        return ResponseEntity.ok(myMatchings);
    }
}