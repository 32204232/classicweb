"use client";

import { useState, useEffect } from "react";
import { getMyApplications } from "@/api/matching";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function MyApplyTab() {
  const [matches, setMatches] = useState<any[]>([]);
  const [contactInfo, setContactInfo] = useState<{type: string, value: string} | null>(null);

  useEffect(() => {
    getMyApplications().then(setMatches).catch(console.error);
  }, []);

  const showContact = (match: any) => {
    // 백엔드 DTO에 post.contactValue가 포함되어 있어야 함 (MatchingApplicantResponse 확인 필요)
    // 만약 DTO에 없다면, 여기서 상세조회 API를 한 번 더 부르거나 DTO를 수정해야 합니다.
    // * 일단 DTO에 있다고 가정하고 작성 *
    setContactInfo({ 
        type: match.post.contactType, 
        value: match.post.contactValue 
    });
  };
  return (
    <>
      <div className="space-y-4">
        {matches.length === 0 && <div className="text-center py-10 text-slate-400">지원한 내역이 없습니다.</div>}
        
        {matches.map((match) => (
          <div key={match.matchingId} className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800">{match.post.title}</h3>
                {match.status === "WAITING" && <Badge variant="outline" className="bg-slate-50">대기중</Badge>}
                {match.status === "ACCEPTED" && <Badge className="bg-emerald-500">수락됨 🎉</Badge>}
                {match.status === "REJECTED" && <Badge variant="destructive">거절됨</Badge>}
            </div>
            
            <p className="text-sm text-slate-500 mb-4">내 메시지: "{match.applicantMessage}"</p>
            
            {/* 수락된 경우에만 연락처 버튼 보임 */}
            {match.status === "ACCEPTED" && (
                <Button onClick={() => showContact(match)} className="w-full font-bold bg-slate-900 text-white">
                    연락처 확인하기
                </Button>
            )}
          </div>
        ))}
      </div>

      {/* 연락처 확인 모달 */}
      <Dialog open={!!contactInfo} onOpenChange={() => setContactInfo(null)}>
        <DialogContent>
            <DialogHeader><DialogTitle>연락처 정보 📞</DialogTitle></DialogHeader>
            <div className="text-center py-6">
                <p className="text-sm text-slate-500 mb-2">{contactInfo?.type}</p>
                <p className="text-2xl font-bold text-primary select-all">{contactInfo?.value}</p>
                <p className="text-xs text-slate-400 mt-4">복사해서 연락해보세요!</p>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
}