"use client";

import { useState, useEffect } from "react";
import { getApplicants, decideMatching } from "@/api/matching";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Check, X } from "lucide-react";

interface ApplicantModalProps {
  postId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicantModal({ postId, isOpen, onClose }: ApplicantModalProps) {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 모달이 열리면 지원자 목록을 가져옴
  useEffect(() => {
    if (isOpen && postId) {
      fetchApplicants();
    }
  }, [isOpen, postId]);

  const fetchApplicants = async () => {
    if (!postId) return;
    setLoading(true);
    try {
      const data = await getApplicants(postId);
      setApplicants(data);
    } catch (error) {
      console.error(error);
      alert("지원자 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 수락 / 거절 핸들러
  const handleDecision = async (matchingId: number, status: "ACCEPTED" | "REJECTED") => {
    if (!confirm(status === "ACCEPTED" ? "이 분과 매칭하시겠습니까?" : "거절하시겠습니까?")) return;
    
    try {
      await decideMatching(matchingId, status);
      alert("처리되었습니다.");
      fetchApplicants(); // 목록 새로고침
    } catch (error) {
      alert("처리에 실패했습니다.");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>지원자 목록 📋</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="py-10 text-center"><Loader2 className="animate-spin mx-auto" /></div>
        ) : applicants.length === 0 ? (
          <div className="py-10 text-center text-slate-500">아직 지원자가 없습니다.</div>
        ) : (
          <div className="space-y-4 mt-4">
            {applicants.map((app) => (
              <div key={app.matchingId} className="p-4 border rounded-xl bg-slate-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={app.applicant.profileImageUrl} />
                        <AvatarFallback>{app.applicant.nickname[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold text-sm">{app.applicant.nickname}</p>
                        {/* 학교 정보는 없거나 DTO에 있다면 표시 */}
                    </div>
                  </div>
                  {/* 상태 뱃지 */}
                  {app.status === "WAITING" ? (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">대기중</Badge>
                  ) : app.status === "ACCEPTED" ? (
                      <Badge className="bg-emerald-500">수락됨</Badge>
                  ) : (
                      <Badge variant="destructive">거절됨</Badge>
                  )}
                </div>
                
                <div className="bg-white p-3 rounded-lg text-sm text-slate-600 mb-4 border">
                    "{app.applicantMessage}"
                </div>

                {/* 버튼 (대기중일 때만 보임) */}
                {app.status === "WAITING" && (
                  <div className="flex gap-2">
                    <Button onClick={() => handleDecision(app.matchingId, "ACCEPTED")} className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-9">
                        <Check className="w-4 h-4 mr-1"/> 수락
                    </Button>
                    <Button onClick={() => handleDecision(app.matchingId, "REJECTED")} variant="outline" className="flex-1 h-9 text-rose-500 hover:text-rose-600 border-rose-200 hover:bg-rose-50">
                        <X className="w-4 h-4 mr-1"/> 거절
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}