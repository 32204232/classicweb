// ★ 기존의 LoginPayload, SignupPayload는 삭제합니다. (이메일 로그인 안 쓰니까요!)

// 1. [신규] 소셜 가입 후 추가 정보 입력용 데이터 (DTO)
// (백엔드의 SocialSignupRequest 와 짝을 이룹니다)
export interface SocialSignupPayload {
  nickname: string;
  part: string;   // 백엔드 ENUM 값 (예: "PIANO")
  region: string; // 백엔드 ENUM 값 (예: "SEOUL")
  // university: string; // (만약 학교 입력도 뺐다면 이 줄은 지우셔도 됩니다)
}

// 2. 서버 응답 데이터 (토큰) - 유지
export interface AuthResponse {
  token: string;
  message: string;
}