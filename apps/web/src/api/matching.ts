import { http } from './http';

export async function getApplicants(postId: number) {
  const token = localStorage.getItem('token');
  const response = await http.get(`/matching/post/${postId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

// 내가 지원한 내역 조회
export async function getMyApplications() {
  const token = localStorage.getItem('token');
  const response = await http.get('/matching/me', {
     headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

// 매칭 결정 (수락/거절)
export async function decideMatching(matchingId: number, status: "ACCEPTED" | "REJECTED") {
  const token = localStorage.getItem('token');
  const response = await http.post('/matching/decision', 
    { matchingId, status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}