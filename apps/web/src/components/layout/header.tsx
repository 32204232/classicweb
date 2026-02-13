"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // 방금 만든 Context 가져오기
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react"; // 로고용 아이콘
import { LoginModal } from "@/components/auth/LoginModal"; // ★ 추가


export function Header() {
  // AuthContext에서 필요한 정보와 함수들을 꺼냅니다.
  const { isLoggedIn, userNickname, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* 1. 로고 (왼쪽) */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Music className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-extrabold text-slate-800 tracking-tight">
              Tutti
            </span>
          </Link>

          {/* PC 버전 메뉴 (모바일에선 숨김) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/posts" className="hover:text-primary transition-colors">
              모집 & 홍보
            </Link>
            {/* 커뮤니티는 보류 */}
            {/* <Link href="/community" className="hover:text-primary transition-colors">커뮤니티</Link> */}
          </nav>
        </div>

        {/* 2. 우측 버튼 (로그인 상태에 따라 다름) */}
        <div className="flex items-center gap-4">
          {/* 공고 올리기 버튼 (항상 보임) */}
          <Link href="/posts/write" className="hidden sm:block">
            <Button className="font-bold shadow-md shadow-primary/20 hover:shadow-lg transition-all">
              공고 올리기
            </Button>
          </Link>

          {isLoggedIn ? (
            /* 로그인 상태일 때 */
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <span className="block text-xs text-slate-400">환영합니다!</span>
                <span className="block text-sm font-bold text-slate-700">
                  {userNickname || "회원"}님  {/* 닉네임 없으면 '회원님' 출력 */}
                </span>
              </div>
              
              {/* 마이페이지 버튼 */}
              <Link href="/mypage">
                <Button variant="outline" size="sm" className="rounded-full border-slate-300">
                  MY
                </Button>
              </Link>

              {/* 로그아웃 버튼 */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout} 
                className="text-slate-500 hover:text-red-500"
              >
                로그아웃
              </Button>
            </div>
          ) : (
            /* 로그아웃 상태일 때 */
            <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
  {/* 회원가입 버튼 삭제하고 로그인 하나로 통일! */}
              <LoginModal />
            </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}