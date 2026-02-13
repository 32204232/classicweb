"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react"; // 닫기 아이콘 (필요시)

// 아이콘들
const NaverIcon = () => (
  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="white">
    <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
  </svg>
);
const KakaoIcon = () => (
  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="#000000">
    <path d="M12 3C7.58 3 4 5.79 4 9.24c0 2.12 1.37 3.99 3.42 5.13-.16.57-.57 2.07-.66 2.39-.1.38.14.38.29.2.17 2.33-1.58 3.23-2.2.57.08 1.15.13 1.73.13 4.42 0 8-2.79 8-6.24S16.42 3 12 3z" />
  </svg>
);

export function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSocialLogin = (provider: "naver" | "kakao") => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  // (이메일 로그인 로직은 AuthContext 연결 필요 - 일단 UI만)
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert("이메일 로그인은 준비 중입니다. (소셜 로그인을 권장합니다)");
  };

  return (
    <Dialog>
      {/* 이 버튼을 누르면 모달이 뜹니다 */}
      <DialogTrigger asChild>
        <Button variant="ghost" className="font-bold text-slate-600">
          로그인
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-white rounded-2xl">
        <DialogHeader className="pt-10 pb-2 px-10 text-center">
          <DialogTitle className="text-3xl font-extrabold text-slate-800">
            Tutti
          </DialogTitle>
        </DialogHeader>

        <div className="px-8 pb-10 space-y-6">
          {/* 이메일 폼 (선택 사항 - 숨겨도 됨) */}
          {/* <form onSubmit={handleEmailLogin} className="space-y-4">
             ... (이메일/비번 입력창 코드) ...
          </form> */}
          
          {/* 소셜 로그인 버튼들 (메인) */}
          <div className="space-y-3 mt-4">
            <Button
              onClick={() => handleSocialLogin("kakao")}
              className="w-full h-12 bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-bold text-md rounded-xl"
            >
              <KakaoIcon /> 카카오로 시작하기
            </Button>
            <Button
              onClick={() => handleSocialLogin("naver")}
              className="w-full h-12 bg-[#03C75A] hover:bg-[#03C75A]/90 text-white font-bold text-md rounded-xl"
            >
              <NaverIcon /> 네이버로 시작하기
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400">또는</span>
            </div>
          </div>

           <div className="text-center text-xs text-slate-400">
              아직 회원이 아니신가요? <span className="text-primary font-bold cursor-pointer hover:underline">회원가입</span>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}