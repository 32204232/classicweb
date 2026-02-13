import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";

// ★ [수정됨] 대문자 H로 변경 (파일명과 일치!)
import { Header } from "@/components/layout/header"; 
import { AuthProvider } from "@/context/AuthContext"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tutti - 앙상블 매칭 플랫폼",
  description: "검증된 음대생들의 매칭 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        {/* ★ 앱 전체를 AuthProvider로 감싸서 로그인 상태 공유 */}
        <AuthProvider> 
            {/* 헤더는 항상 위에 고정 */}
            <Header />
            
            {/* 실제 페이지 내용은 여기(children)에 들어감 */}
            <main className="min-h-screen bg-gray-50">
                {children}
            </main>
            <Toaster />
        </AuthProvider>

      </body>
    </html>
  );
}