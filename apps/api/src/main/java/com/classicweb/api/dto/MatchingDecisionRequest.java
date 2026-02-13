package com.classicweb.api.dto;

import com.classicweb.api.domain.MatchingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MatchingDecisionRequest {
    @NotNull(message = "결정할 매칭 번호를 알려주세요.")
    private Long matchingId;

    @NotNull(message = "수락(ACCEPTED)인지 거절(REJECTED)인지 선택해주세요.")
    private MatchingStatus status;
}