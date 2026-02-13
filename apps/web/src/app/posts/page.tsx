"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getPosts, Post } from "@/api/posts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

// ★ 분리한 컴포넌트 가져오기
import FilterSidebar from "@/components/posts/FilterSidebar";
import PostList from "@/components/posts/PostList";

function PostListContent() {
  const searchParams = useSearchParams();
  
  // 상태 관리
  const [activeTab, setActiveTab] = useState<"recruit" | "promotion">("recruit");
  
  // ★ [수정 1] parts는 배열([])로 초기화해야 합니다!
  const [filters, setFilters] = useState({
    parts: [] as string[], // 다중 선택을 위해 배열로!
    region: searchParams.get("region") || "", // 지역은 전체면 빈값("")이나 "ALL"
    fee: "",
    keyword: "",
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // 데이터 Fetching
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await getPosts();

        // 프론트엔드 필터링
        const filtered = allPosts.filter(post => {
          // 1. 탭 구분
          const isRecruitTab = activeTab === "recruit";
          const isPromoPost = post.category === "CONCERT_PR" || post.category === "SEMINAR";
          if (isRecruitTab && isPromoPost) return false;
          if (!isRecruitTab && !isPromoPost) return false;

          // 2. 상세 필터
          
          // ★ [수정 2] 다중 선택 필터링 (배열에 값이 있으면, 그 중 하나라도 포함되어야 함)
          if (filters.parts.length > 0 && !filters.parts.includes(post.recruitPart)) {
             return false;
          }

          // 지역 필터
          if (filters.region && filters.region !== "ALL" && post.region !== filters.region) return false;
          
          // 금액 필터
          if (filters.fee && post.fee !== filters.fee) return false;
          
          // 검색어 필터
          if (filters.keyword && !post.title.toLowerCase().includes(filters.keyword.toLowerCase())) return false;

          return true;
        });

        setPosts(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab, filters]);

  // 핸들러
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // ★ [수정 3] 초기화 로직 수정 (문법 오류 해결)
  const handleReset = () => {
    setFilters({ parts: [], region: "", fee: "", keyword: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. 페이지 헤더 */}
      <div className="border-b bg-white sticky top-16 z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-14 gap-6">
            <button
              onClick={() => setActiveTab("recruit")}
              className={`h-full px-4 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "recruit" ? "border-primary text-primary" : "border-transparent text-slate-500"
              }`}
            >
              구인 공고
            </button>
            <button
              onClick={() => setActiveTab("promotion")}
              className={`h-full px-4 text-sm font-bold border-b-2 transition-colors ${
                activeTab === "promotion" ? "border-primary text-primary" : "border-transparent text-slate-500"
              }`}
            >
              연주회 홍보
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 items-start">
          
          {/* 2. 왼쪽 사이드바 */}
          <aside className="hidden md:block sticky top-32">
             <FilterSidebar 
                filters={filters} 
                onChange={handleFilterChange} 
                onReset={handleReset} 
             />
          </aside>

          {/* 3. 메인 영역 */}
          <main className="space-y-6">
            {/* 검색창 */}
            <div className="flex gap-2 sticky top-32 z-10 bg-white/95 backdrop-blur py-2 md:static">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="검색어를 입력하세요 (예: 슈베르트, 반주자)" 
                  className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white rounded-xl"
                  value={filters.keyword}
                  onChange={(e) => handleFilterChange("keyword", e.target.value)}
                />
              </div>
              {/* 모바일용 필터 버튼 (PC 숨김) */}
              <Button variant="outline" className="md:hidden h-11 w-11 p-0 rounded-xl border-slate-200">
                <SlidersHorizontal className="h-5 w-5 text-slate-600" />
              </Button>
            </div>

            {/* 리스트 */}
            <PostList posts={posts} loading={loading} />
          </main>

        </div>
      </div>
    </div>
  );
}

export default function PostListPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostListContent />
    </Suspense>
  );
}