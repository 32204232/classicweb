"use client";

import Link from "next/link";
import { Post } from "@/api/posts"; // API 타입 가져오기
import { Badge } from "@/components/ui/badge";
import { MapPin, Music, Users, Calendar } from "lucide-react";

interface PostListProps {
  posts: Post[];
  loading: boolean;
}

export default function PostList({ posts, loading }: PostListProps) {
  if (loading) {
    return <div className="py-32 text-center text-slate-400">데이터를 불러오고 있습니다...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="py-32 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <p className="text-slate-500 mb-2">조건에 맞는 공고가 없습니다.</p>
        <p className="text-xs text-slate-400">필터를 변경하거나 검색어를 수정해보세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id} className="block group">
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex gap-5 items-start">
            
            {/* 썸네일 */}
            <div className="w-24 h-24 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-slate-400 shrink-0 group-hover:bg-primary/5 group-hover:text-primary transition-colors border border-slate-100">
               <Music className="h-8 w-8 mb-1 opacity-70"/>
               <span className="text-[10px] font-bold">{post.recruitPart || "기타"}</span>
            </div>

            {/* 정보 영역 */}
            <div className="flex-1 min-w-0 py-0.5">
               <div className="flex items-center gap-2 mb-1.5">
                  {post.status === "RECRUITING" ? (
                    <Badge variant="default" className="bg-emerald-50 text-emerald-600 border-emerald-100">구인중</Badge> 
                  ) : (
                    <Badge variant="secondary">마감</Badge>
                  )}
                  <span className="text-xs text-slate-500 font-medium px-1.5 py-0.5 bg-slate-100 rounded-md">
                    {post.category}
                  </span>
               </div>
               
               <h3 className="text-lg font-bold text-slate-900 line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                 {post.title}
               </h3>

               <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {post.region}</span>
                  <div className="w-px h-3 bg-slate-200"></div>
                  <span className="font-bold text-slate-700">{post.fee}</span>
               </div>
               
               <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    {post.eventDate ? (
                        <>
                            <Calendar className="w-3 h-3"/>
                            {new Date(post.eventDate).toLocaleDateString()}
                        </>
                    ) : "상시모집"}
                  </span>
                  <span className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-1 rounded-full">
                     <Users className="w-3 h-3"/> {post.currentCount}/{post.targetCount}명
                  </span>
               </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}