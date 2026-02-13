package com.classicweb.api.dto;

import com.classicweb.api.domain.ContactType;
import com.classicweb.api.domain.Part;
import com.classicweb.api.domain.PostCategory;
import com.classicweb.api.domain.Region;
import com.fasterxml.jackson.annotation.JsonFormat; // ★ 추가

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.time.LocalDateTime;

@Data
public class PostCreateRequest {

    @NotBlank(message = "제목을 입력해주세요.")
    private String title;

    @NotBlank(message = "내용을 입력해주세요.")
    private String content;

    @NotNull(message = "카테고리를 선택해주세요.")
    private PostCategory category;

    private List<RecruitPartDto> parts;

    @Getter
    @NoArgsConstructor
    public static class RecruitPartDto {
        private Part part;
        private int count;
    }

    @NotNull(message = "지역을 선택해주세요.")
    private Region region;

    private String fee;

    @NotNull(message = "연락처 유형을 선택해주세요.")
    private ContactType contactType;

    @NotBlank(message = "연락처(ID 또는 번호)를 입력해주세요.")
    private String contactValue;

    // ★ [수정 1] @NotNull 삭제! (상시 모집 가능하게)
    // ★ [수정 2] @JsonFormat 추가 (프론트가 보내는 형식을 알려줘야 함)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime eventDate;

    @NotNull(message = "모집 인원 수를 입력해주세요.")
    private Integer targetCount;

    private Boolean isUrgent;
}