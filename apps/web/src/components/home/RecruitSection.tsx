import Link from "next/link";
import { Post } from "@/api/posts";
import PostCard from "./PostCard";

interface Props {
  posts: Post[];
  loading: boolean;
}

export default function RecruitSection({ posts, loading }: Props) {
  return (
    <section className="container mx-auto px-4 py-12 border-t bg-slate-50/50">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">🔥 지금 파트너를 찾고 있어요</h2>
          <p className="text-sm text-slate-500 mt-1">마감이 얼마 남지 않은 공고들입니다.</p>
        </div>
        <Link href="/posts?tab=recruit" className="text-sm font-medium text-primary hover:underline">
          매칭 전체보기
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">로딩중...</div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
          <p>아직 등록된 구인 공고가 없습니다.</p>
          <Link href="/posts/write" className="text-primary font-bold mt-2 hover:underline">
            첫 번째 의뢰인이 되어보세요!
          </Link>
        </div>
      )}
    </section>
  );
}