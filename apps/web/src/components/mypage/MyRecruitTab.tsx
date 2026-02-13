"use client";

import { useState, useEffect } from "react";
import { getMyPosts } from "@/api/posts";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import ApplicantModal from "./ApplicantModal"; // 위에서 만든 모달

export default function MyRecruitTab() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    getMyPosts().then(setPosts).catch(console.error);
  }, []);

  return (
    <div className="space-y-4">
      {posts.length === 0 && <div className="text-center py-10 text-slate-400">작성한 공고가 없습니다.</div>}
      
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-5 rounded-xl border shadow-sm flex justify-between items-center">
          <div>
            <div className="flex gap-2 mb-1">
                <span className="text-xs font-bold text-primary border border-primary/30 px-1.5 py-0.5 rounded">{post.category}</span>
                {post.status === "COMPLETED" && <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">마감</span>}
            </div>
            <h3 className="font-bold text-slate-800">{post.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{post.eventDate ? post.eventDate.split("T")[0] : "상시모집"}</p>
          </div>

          <Button onClick={() => setSelectedPostId(post.id)} variant="outline" className="border-primary text-primary hover:bg-primary/5">
             <Users className="w-4 h-4 mr-2"/> 지원자 관리
          </Button>
        </div>
      ))}

      {/* 지원자 관리 모달 */}
      <ApplicantModal 
        postId={selectedPostId} 
        isOpen={!!selectedPostId} 
        onClose={() => setSelectedPostId(null)} 
      />
    </div>
  );
}