package com.classicweb.api.domain;

public enum PostCategory {
    // 1. 구인/매칭 (Hiring)
    PERFORMANCE_EXAM, // 실기시험 (위클리/기말)
    GRADUATION,       // 졸업연주
    LESSON,           // 레슨 반주
    MASTER_CLASS,     // 마스터클래스 반주
    COMPETITION,      // 콩쿨/오디션 반주
    CONCERT,          // 일반 연주회/독주회 반주
    ENSEMBLE,         // 앙상블 팀원 모집
    CHOIR,            // 합창/성가대 객원
    EVENT,            // 웨딩/행사 연주
    
    // 2. 홍보 (PR)
    CONCERT_PR,       // 연주회 홍보
    SEMINAR,          // 세미나/마스터클래스 홍보
    
    // 3. 기타
    ETC               // 기타
    

}