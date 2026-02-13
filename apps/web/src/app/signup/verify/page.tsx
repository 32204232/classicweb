"use client";

import { useState, useEffect, Suspense } from "react"; // Suspense 추가
import { useRouter, useSearchParams } from "next/navigation";
import { verifyPhone } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Phone, ArrowRight } from "lucide-react";

// ★ 내부 컴포넌트로 분리 (useSearchParams를 쓰기 때문)
function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // 1. 초기화 및 토큰 검증
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const tokenFromStorage = localStorage.getItem("token");

    // URL에 토큰이 있으면 -> 저장 (가장 최신 토큰)
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
    } 
    // URL에도 없고, 저장소에도 없다면? -> 비정상 접근! 쫓아냄.
    else if (!tokenFromStorage) {
      alert("잘못된 접근입니다. 로그인이 필요합니다.");
      router.replace("/login");
    }
  }, [searchParams, router]);
  
  // 2. 인증하기 버튼 클릭
  const handleVerify = async () => {
    try {
      setIsLoading(true);
      // 가짜 인증 로직 (실제론 아임포트 연동)
      await verifyPhone(); 
      
      // ★ 중요: 인증 성공 후 Context나 로컬스토리지에 뭔가 갱신할 필요는 없음 
      // (Role이 바뀌었지만 토큰은 유효하므로)
      
      alert("본인 인증이 완료되었습니다! 정회원으로 승격되었습니다. 🎉");
      router.push("/"); 
    } catch (error) {
      console.error(error);
      alert("인증 처리에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. 다음에 하기 버튼 클릭
  const handleSkip = () => {
    if (confirm("인증을 건너뛰시겠습니까? \n(인증하지 않으면 글쓰기가 제한될 수 있습니다.)")) {
        router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center">
        
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-800 mb-3">
          안전한 거래를 위해<br/>본인인증이 필요해요
        </h1>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          서비스를 판매 / 구매하는 과정에서의 <br/>
          서로의 신뢰를 위해 본인인증을 진행합니다.
        </p>

        <div className="space-y-4">
          <Button 
            onClick={handleVerify} 
            className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all bg-slate-900 hover:bg-slate-800"
            disabled={isLoading}
          >
            <Phone className="w-5 h-5 mr-2" />
            본인인증 하기
          </Button>
          
          <button 
            onClick={handleSkip}
            className="flex items-center justify-center w-full py-2 text-sm text-slate-400 hover:text-slate-600 transition-colors gap-1"
          >
            다음에 하기 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ★ 메인 컴포넌트는 Suspense로 감싸기만 함
export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">로딩중...</div>}>
      <VerifyContent />
    </Suspense>
  );
}