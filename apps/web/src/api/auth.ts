import { http } from './http';

// 1. 파트 목록 가져오기 (드롭다운용)
export async function getParts(): Promise<string[]> {
  const response = await http.get('/auth/parts');
  return response.data;
}

// 2. 지역 목록 가져오기 (드롭다운용)
export async function getRegions(): Promise<string[]> {
  const response = await http.get('/auth/regions');
  return response.data;
}

// 3. 소셜 가입 추가 정보 입력 (GUEST -> USER 승격)
export interface SocialSignupPayload {
  nickname: string;
  part: string;
  region: string;
}

export async function socialSignup(payload: SocialSignupPayload) {
  // PATCH /api/auth/social/signup
  return await http.patch('/auth/social/signup', payload);
}

export async function verifyPhone() {
  // PATCH /api/auth/verify/phone
  // (헤더에 토큰이 자동으로 실려가므로, 백엔드가 누군지 압니다)
  return await http.patch('/auth/verify/phone');
}