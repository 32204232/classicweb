"use client";

import { useState, useEffect, use } from "react"; 
import { useRouter } from "next/navigation";
import { getPostDetail, applyMatching } from "@/api/posts";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Calendar, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // ★ 닉네임 가져오기 (본인 확인용)
  const { isLoggedIn, userNickname } = useAuth(); 
  const router = useRouter();
  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isApplying, setIsApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostDetail(id);
        setPost(data);
      } catch (error) {
        console.error(error);
        alert("글을 불러올 수 없습니다.");
        router.push("/posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, router]);

  const handleApply = async () => {
    if (!message.trim()) return alert("메시지를 입력해주세요.");
    
    try {
      setIsApplying(true);
      await applyMatching(id, message);
      
      alert("지원 완료! 방장의 수락을 기다려주세요. 🎉");
      setIsModalOpen(false); 
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "지원에 실패했습니다.");
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) return <div className="text-center py-20">로딩중...</div>;
  if (!post) return null;

  // ★ 본인 확인
  const isMyPost = isLoggedIn && (userNickname === post.writerNickname);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* 상단 네비게이션 */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b px-4 h-14 flex items-center">
        <Link href="/posts">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </Link>
        <span className="ml-4 font-bold text-slate-800 truncate flex-1">{post.title}</span>
      </div>

      <div className="container mx-auto max-w-2xl px-4 py-6 space-y-8">
        
        {/* 1. 헤더 섹션 */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Badge variant="secondary">{post.category}</Badge>
            <Badge variant="outline" className="text-primary border-primary">{post.recruitPart}</Badge>
            {post.isUrgent && <Badge variant="destructive">급구</Badge>}
          </div>
          
          <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-slate-500 pb-6 border-b">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {post.region}
            </div>
            <div className="w-px h-3 bg-slate-300"></div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {post.eventDate ? post.eventDate.split("T")[0] : "상시모집"}
            </div>
            <div className="ml-auto font-bold text-slate-700">
                작성자: {post.writerNickname}
            </div>
          </div>
        </div>

        {/* 2. 핵심 정보 카드 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl text-center">
            <p className="text-xs text-slate-500 mb-1">사례비</p>
            <p className="font-bold text-slate-800">{post.fee}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl text-center">
            <p className="text-xs text-slate-500 mb-1">모집 현황</p>
            <p className="font-bold text-slate-800 flex justify-center items-center gap-1">
               <Users className="w-4 h-4" /> {post.currentCount} / {post.targetCount}명
            </p>
          </div>
        </div>

        {/* 3. 본문 내용 */}
        <div className="whitespace-pre-wrap leading-relaxed text-slate-700 min-h-[200px]">
          {post.content}
        </div>

      </div>

      {/* 4. 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 pb-8 safe-area-pb">
        <div className="container max-w-2xl mx-auto">
            {!isLoggedIn ? (
                <Link href="/login">
                    <Button className="w-full h-12 text-lg font-bold bg-slate-800">로그인하고 지원하기</Button>
                </Link>
            ) : isMyPost ? (
                <Button className="w-full h-12 text-lg font-bold bg-slate-100 text-slate-400 cursor-not-allowed" disabled>
                    내가 작성한 공고입니다
                </Button>
            ) : (
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20">
                            지원하기
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>지원 메시지 보내기 📨</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <Textarea 
                                placeholder="예) 안녕하세요, 한예종 피아노과입니다. 일정 가능합니다!" 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="min-h-[100px]"
                            />
                            <Button onClick={handleApply} disabled={isApplying} className="w-full">
                                {isApplying ? "전송 중..." : "지원서 보내기"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
      </div>
    </div>
  );
}