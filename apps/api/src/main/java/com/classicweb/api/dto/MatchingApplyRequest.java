package com.classicweb.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MatchingApplyRequest {
    @NotNull(message = "어느 글에 지원할지 알려주세요.")
    private Long postId;

    private String message; // 예: "저 이대 반주과인데 시간 맞아요!"
}