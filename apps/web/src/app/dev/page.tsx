"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { http } from "@/api/http";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DevLoginPage() {
  const [email, setEmail] = useState("user1@test.com");
  const { setAuthInfo } = useAuth();
  const router = useRouter();

  const handleFakeLogin = async () => {
    try {
      // 개발용 로그인 API 호출
      const res = await http.post("/dev/login", { email });
      const token = res.data; // 토큰을 바로 줌

      // 로그인 처리 (닉네임은 대충 넣음, 어차피 새로고침하면 백엔드에서 가져옴 or 헤더가 처리함)
      setAuthInfo(token, "테스터_" + email.split("@")[0]);

      alert(`[${email}] 계정으로 로그인 성공!`);
      router.push("/");
    } catch (e) {
      alert("로그인 실패");
    }
  };

  return (
    <div className="p-10 flex flex-col gap-4 max-w-md mx-auto mt-20 border rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-red-500">🚧 개발자 전용 뒷문</h1>
      <p className="text-sm text-slate-500">이메일만 입력하면 회원가입+로그인이 한방에 됩니다.</p>
      
      <div className="flex gap-2">
        <Input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="아무_이메일@test.com"
        />
        <Button onClick={handleFakeLogin} className="bg-red-500 hover:bg-red-600">
          접속
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button variant="outline" onClick={() => setEmail("singer@test.com")}>
          성악가(구인자)로 설정
        </Button>
        <Button variant="outline" onClick={() => setEmail("pianist@test.com")}>
          피아니스트(지원자)로 설정
        </Button>
      </div>
    </div>
  );
}