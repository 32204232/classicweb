package com.classicweb.api.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PartCategory {
    KEYBOARD("건반악기"),
    STRING("현악기"),
    WOODWIND("목관악기"),
    BRASS("금관악기"),
    PERCUSSION("타악기"),
    VOCAL("성악"),
    COMPOSITION("작곡/지휘"),
    ETC("기타");

    private final String description;
}