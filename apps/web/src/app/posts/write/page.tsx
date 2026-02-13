"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { usePostForm } from "@/hooks/usePostForm"; // ★ 우리의 '뇌' 가져오기

// UI 컴포넌트
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Loader2, Check } from "lucide-react";

// 단계별 부품 가져오기
import Step1Category from "@/components/post-write/Step1Category";
import Step2Info from "@/components/post-write/Step2Info";
import Step3Content from "@/components/post-write/Step3Content";
import Step4Condition from "@/components/post-write/Step4Condition";

export default function PostWritePage() {
  // 1. 훅(Hook) 사용: 로직은 전부 여기서 나옵니다.
  const { 
    step, 
    formData, 
    isLoading, 
    handleChange, 
    nextStep, 
    prevStep, 
    submitForm 
  } = usePostForm();

  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // 2. 로그인 체크 (없으면 쫓아냄)
  useEffect(() => {

    // 1. 비로그인 차단
    if (!isLoggedIn && typeof window !== 'undefined' && !localStorage.getItem("token")) {
      alert("로그인이 필요한 서비스입니다.");
      router.replace('/login');
      return;
    }

    // ★ 2. [주석 처리됨] GUEST(미인증) 유저 차단 로직
    /* if (userRole === 'ROLE_GUEST') {
      if (confirm("휴대폰 인증을 완료해야 글을 쓸 수 있습니다.\n인증 페이지로 이동하시겠습니까?")) {
        router.push('/signup/verify');
      } else {
        router.push('/'); // 취소하면 홈으로
      }
    }
    */
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!isLoggedIn && !token) {
      alert("로그인이 필요한 서비스입니다.");
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  // 3. "다음" 버튼 활성화 여부 체크 (유효성 검사)
  const isNextDisabled = () => {
    switch (step) {
      case 1: return !formData.category;
      case 2: return !formData.recruitPart || !formData.region;
      case 3: return !formData.title || !formData.content || !formData.contactValue;
      default: return false;
    }
  };

  // 아직 로딩 중이거나 로그인 안 됐으면 빈 화면 (깜빡임 방지)
  if (!isLoggedIn && typeof window !== 'undefined' && !localStorage.getItem('token')) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-lg space-y-6">
        
        {/* 헤더 & 진행바 */}
        <div className="text-center mb-8">
           <h1 className="text-2xl font-bold text-slate-800">공고 올리기</h1>
           <div className="flex justify-center gap-4 mt-4">
             {[1, 2, 3, 4].map((s) => (
               <div key={s} className={`flex flex-col items-center gap-2`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                   step >= s ? "bg-primary text-white shadow-md" : "bg-slate-200 text-slate-400"
                 }`}>
                   {step > s ? <Check className="w-5 h-5" /> : s}
                 </div>
               </div>
             ))}
           </div>
           <p className="text-sm text-slate-500 mt-2 font-medium">Step {step} / 4</p>
        </div>

        {/* 메인 콘텐츠 카드 */}
        <Card className="border-0 shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 min-h-[420px] flex flex-col justify-between">
            
            {/* ★ 단계별 컴포넌트 갈아끼우기 (Switch Case) */}
            <div className="flex-1">
              {step === 1 && <Step1Category data={formData} onChange={handleChange} />}
              {step === 2 && <Step2Info data={formData} onChange={handleChange} />}
              {step === 3 && <Step3Content data={formData} onChange={handleChange} />}
              {step === 4 && <Step4Condition data={formData} onChange={handleChange} />}
            </div>

            {/* 하단 네비게이션 버튼 */}
            <div className="mt-8 flex gap-3 pt-4 border-t border-slate-100">
              {step > 1 && (
                <Button variant="outline" onClick={prevStep} className="flex-1 h-12 text-base hover:bg-slate-100">
                  <ChevronLeft className="w-4 h-4 mr-1" /> 이전
                </Button>
              )}
              
              {step < 4 ? (
                <Button 
                  onClick={nextStep} 
                  className="flex-1 h-12 text-base font-bold shadow-md" 
                  disabled={isNextDisabled()}
                >
                  다음 <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button 
                  onClick={submitForm} 
                  className="flex-1 h-12 text-base font-bold bg-slate-900 hover:bg-slate-800 shadow-lg" 
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "공고 등록완료 🎉"}
                </Button>
              )}
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}