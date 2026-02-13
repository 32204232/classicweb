import axios from 'axios';

// 1. 기본 설정 (백엔드 주소 입력)
export const http = axios.create({
  baseURL: 'http://localhost:8080/api', // 백엔드 공통 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. 요청 보낼 때마다 토큰(Token)이 있으면 자동으로 끼워넣기 (인터셉터)
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // 브라우저 저장소에서 토큰 꺼내기
 // ★ [디버깅용 로그 추가] 이 줄을 추가하고 콘솔을 보세요!
  console.log("🚀 [API 요청] 주소:", config.url);
  console.log("🔑 [토큰 상태]:", token ? "토큰 있음 (Bearer ...)" : "토큰 없음 (null)");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 헤더에 착!
  }
  return config;
});