"use client";

import { useState, useEffect } from "react";
import { getPosts, Post } from "@/api/posts";

// 컴포넌트들 (PostFilterBar는 삭제했습니다)
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import RecruitSection from "@/components/home/RecruitSection";
import PromoSection from "@/components/home/PromoSection";

export default function Home() {
  const [recruitPosts, setRecruitPosts] = useState<Post[]>([]);
  const [promoPosts, setPromoPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPosts = await getPosts();

        // 1. 구인 공고 (최신순 4개)
        const recruits = allPosts
          .filter((p) => p.category !== "CONCERT_PR" && p.category !== "SEMINAR")
          .sort((a, b) => (b.id - a.id)) // 최신순 정렬 (ID 역순)
          .slice(0, 4);

        // 2. 홍보글 (최신순 3개)
        const promos = allPosts
          .filter((p) => p.category === "CONCERT_PR" || p.category === "SEMINAR")
          .sort((a, b) => (b.id - a.id))
          .slice(0, 3);

        setRecruitPosts(recruits);
        setPromoPosts(promos);
      } catch (error) {
        console.error("메인 데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* 1. 메인 배너 & 검색 */}
      <HeroSection />
      
      {/* 2. 카테고리 바로가기 */}
      <CategoryGrid />
      
      {/* 3. 최신 구인 공고 */}
      <RecruitSection posts={recruitPosts} loading={loading} />
      
      {/* 4. 최신 연주회 홍보 */}
      <PromoSection posts={promoPosts} loading={loading} />
    </div>
  );
}