import Link from "next/link";
import { Post } from "@/api/posts";
import PromoCard from "./PromoCard";

interface Props {
  posts: Post[];
  loading: boolean;
}

export default function PromoSection({ posts, loading }: Props) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">🎫 곧 열리는 연주회</h2>
          <p className="text-sm text-slate-500 mt-1">동료들의 멋진 연주를 관람해보세요.</p>
        </div>
        <Link href="/posts?tab=promotion" className="text-sm font-medium text-primary hover:underline">
          홍보 전체보기
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">로딩중...</div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PromoCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p>등록된 홍보글이 없습니다.</p>
        </div>
      )}
    </section>
  );
}