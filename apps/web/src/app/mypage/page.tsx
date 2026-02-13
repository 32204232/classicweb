"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import MyRecruitTab from "@/components/mypage/MyRecruitTab";
import MyApplyTab from "@/components/mypage/MyApplyTab";

export default function MyPage() {
  const { isLoggedIn, userNickname } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"recruit" | "apply">("recruit");

  // 로그인 체크
  useEffect(() => {
    if (!isLoggedIn && typeof window !== 'undefined' && !localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 프로필 헤더 */}
      <div className="bg-white border-b py-8 px-4 text-center">
         <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            😊
         </div>
         <h1 className="text-xl font-bold text-slate-800">{userNickname}님</h1>
         <p className="text-sm text-slate-500">반가워요! 오늘도 멋진 연주 하세요.</p>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex bg-white border-b sticky top-16 z-10">
        <button 
            onClick={() => setActiveTab("recruit")}
            className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === "recruit" ? "border-primary text-primary" : "border-transparent text-slate-400"}`}
        >
            나의 모집
        </button>
        <button 
            onClick={() => setActiveTab("apply")}
            className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === "apply" ? "border-primary text-primary" : "border-transparent text-slate-400"}`}
        >
            나의 지원
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="container mx-auto px-4 py-6 max-w-lg">
        {activeTab === "recruit" ? <MyRecruitTab /> : <MyApplyTab />}
      </div>
    </div>
  );
}