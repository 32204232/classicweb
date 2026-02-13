import { http } from './http';

export interface Post {
  id: number;
  title: string;
  recruitPart: string;
  region: string;
  fee: string;
  status: string;
  eventDate: string | null;
  targetCount: number;
  currentCount: number;
  category: string;
}

// 게시글 목록 조회
export async function getPosts(params?: any) {
  const response = await http.get<Post[]>('/posts', { params });
  return response.data;
}
export async function getPostDetail(postId: string) {
  const response = await http.get<Post>(`/posts/${postId}`);
  return response.data;
}
// ... 기존 코드 ...

// ★ [추가] 내가 쓴 글 목록 조회
export async function getMyPosts() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("로그인이 필요합니다.");
  
  const response = await http.get<Post[]>('/posts/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}


export async function applyMatching(postId: string, message: string) {

  const token = localStorage.getItem('token');
  if (!token) throw new Error("로그인이 필요합니다.");

  const response = await http.post('/matching', 
    { postId, message },
    {
      headers: {
        Authorization: `Bearer ${token}` // ★ 헤더 직접 명시 (안전장치)
      }
    }
  );
}