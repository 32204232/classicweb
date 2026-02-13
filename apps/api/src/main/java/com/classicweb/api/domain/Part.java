package com.classicweb.api.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Part {
    
    // 1. 건반악기
    PIANO("피아노", PartCategory.KEYBOARD),
    ORGAN("오르간", PartCategory.KEYBOARD),
    ACCORDION("아코디언", PartCategory.KEYBOARD),
    
    // 2. 현악기
    VIOLIN("바이올린", PartCategory.STRING),
    VIOLA("비올라", PartCategory.STRING),
    CELLO("첼로", PartCategory.STRING),
    DOUBLE_BASS("더블베이스", PartCategory.STRING),
    HARP("하프", PartCategory.STRING),
    CLASSICAL_GUITAR("클래식기타", PartCategory.STRING),

    // 3. 목관악기
    FLUTE("플루트", PartCategory.WOODWIND),
    PICCOLO("피콜로", PartCategory.WOODWIND),
    OBOE("오보에", PartCategory.WOODWIND),
    CLARINET("클라리넷", PartCategory.WOODWIND),
    BASSOON("바순", PartCategory.WOODWIND),
    SAXOPHONE("색소폰", PartCategory.WOODWIND),

    // 4. 금관악기
    TRUMPET("트럼펫", PartCategory.BRASS),
    TROMBONE("트롬본", PartCategory.BRASS),
    HORN("호른", PartCategory.BRASS),
    TUBA("튜바", PartCategory.BRASS),
    EUPHONIUM("유포니움", PartCategory.BRASS),

    // 5. 타악기
    TIMPANI("팀파니", PartCategory.PERCUSSION),
    PERCUSSION("타악기", PartCategory.PERCUSSION),

    // 6. 성악
    SOPRANO("소프라노", PartCategory.VOCAL),
    MEZZO_SOPRANO("메조소프라노", PartCategory.VOCAL),
    COUNTER_TENOR("카운터테너", PartCategory.VOCAL),
    TENOR("테너", PartCategory.VOCAL),
    BARITONE("바리톤", PartCategory.VOCAL),
    BASS("베이스", PartCategory.VOCAL),

    // 7. 작곡/지휘
    COMPOSITION("작곡", PartCategory.COMPOSITION),
    CONDUCTOR("지휘", PartCategory.COMPOSITION),
    CHORAL_CONDUCTOR("합창지휘", PartCategory.COMPOSITION),

    // 8. 기타
    NONE("일반/관객", PartCategory.ETC);

    private final String label;          // 한글 이름
    private final PartCategory category; // 대분류 (Parent)
}