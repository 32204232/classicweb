package com.classicweb.api.service;

import com.classicweb.api.domain.*;
import com.classicweb.api.dto.MatchingApplyRequest;
import com.classicweb.api.dto.MatchingDecisionRequest;
import com.classicweb.api.repository.MatchingRepository;
import com.classicweb.api.repository.PostRepository;
import com.classicweb.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.classicweb.api.dto.MatchingApplicantResponse; 
import java.util.stream.Collectors; // List 변환용
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MatchingService {

    private final MatchingRepository matchingRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 1. 지원하기 (반주자 -> 성악가)
    @Transactional
    public Long applyMatching(String userEmail, MatchingApplyRequest request) {
        
        // 정보 찾기
        User applicant = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        // === [검증 로직 Start] ===
        
        // 1) 자작극 방지: 내가 쓴 글에 내가 지원?
        if (post.getUser().getId().equals(applicant.getId())) {
            throw new IllegalArgumentException("본인이 작성한 글에는 지원할 수 없습니다.");
        }

        // 2) 중복 지원 방지: 이미 지원했나?
        if (matchingRepository.existsByPostAndUser(post, applicant)) {
            throw new IllegalArgumentException("이미 지원한 게시글입니다.");
        }

        // 3) 마감 체크: 이미 구인 완료된 글인가?
        if (post.getStatus() == PostStatus.COMPLETED) {
            throw new IllegalArgumentException("이미 모집이 마감된 글입니다.");
        }
        // === [검증 로직 End] ===

        // 저장 (상태는 기본값인 WAITING으로 들어감)
        Matching matching = Matching.builder()
                .post(post)
                .user(applicant)
                .message(request.getMessage())
                .build();

        return matchingRepository.save(matching).getId();
    }

    // 2. 결정하기 (방장 -> 지원자 수락/거절)
    @Transactional
    public void decideMatching(String userEmail, MatchingDecisionRequest request) {
        
        // 매칭 정보 가져오기
        Matching matching = matchingRepository.findById(request.getMatchingId())
                .orElseThrow(() -> new IllegalArgumentException("해당 지원 내역이 없습니다."));

        // 방장(글 작성자) 정보 가져오기
        User owner = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // === [보안 검증] ===
        // 이 버튼을 누른 사람이 진짜 이 글의 주인인가? (남의 글 지원자를 수락해버리면 큰일남!)
        if (!matching.getPost().getUser().getId().equals(owner.getId())) {
            throw new IllegalArgumentException("게시글 작성자만 상태를 변경할 수 있습니다.");
        }

        // 상태 변경 (ACCEPTED or REJECTED)
        matching.updateStatus(request.getStatus());

        // (선택) 만약 수락(ACCEPTED)했다면, 게시글을 자동으로 '모집 마감' 처리할 수도 있음
        // if (request.getStatus() == MatchingStatus.ACCEPTED) {
        //     matching.getPost().closeRecruitment();
        // }
    }

    // 3. 내 글에 지원한 사람들 보기 (방장용)
public List<MatchingApplicantResponse> getApplicants(String userEmail, Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다."));
        
        // 내 글인지 확인 (Security Check)
        if (!post.getUser().getEmail().equals(userEmail)) {
             throw new IllegalArgumentException("본인의 게시글만 조회할 수 있습니다.");
        }

        List<Matching> matchings = matchingRepository.findAllByPostOrderByCreatedAtDesc(post);

        // ★★★ 핵심 수정: Entity List를 DTO List로 변환합니다. ★★★
        return matchings.stream()
                .map(MatchingApplicantResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    // 4. 내가 지원한 목록 보기 (지원자용)
    public List<MatchingApplicantResponse> getMyApplications(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("유저 없음"));
                
        List<Matching> matchings = matchingRepository.findAllByUserOrderByCreatedAtDesc(user);
        
        // ★ 핵심 수정: Entity List를 DTO List로 변환합니다. ★
        return matchings.stream()
                .map(MatchingApplicantResponse::fromEntity)
                .collect(Collectors.toList());
    }
}