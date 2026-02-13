"use client";

import { Button } from "@/components/ui/button";

// 아이콘 컴포넌트 (재사용 - 나중엔 별도 파일로 분리하면 더 좋습니다)
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

export default function LoginPage() {
  const handleLogin = (provider: 'naver' | 'kakao') => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">Tutti</h1>
        <p className="text-slate-500 text-sm mb-10">
          로그인하고 앙상블 매칭을 시작해보세요.<br />
          (계정이 없으면 자동으로 가입됩니다)
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => handleLogin('kakao')}
            className="w-full h-12 bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-bold text-md rounded-xl"
          >
            <KakaoIcon /> 카카오로 로그인
          </Button>

          <Button
            onClick={() => handleLogin('naver')}
            className="w-full h-12 bg-[#03C75A] hover:bg-[#03C75A]/90 text-white font-bold text-md rounded-xl"
          >
            <NaverIcon /> 네이버로 로그인
          </Button>
        </div>
        
        {/* 하단 안내 문구 */}
        <div className="mt-8 text-xs text-slate-400">
          로그인 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.
        </div>
      </div>
    </div>
  );
}