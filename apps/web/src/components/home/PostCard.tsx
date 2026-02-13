import Link from "next/link";
import { MapPin, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/api/posts"; // Ensure you have this type exported from your API file

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.id}`} className="block h-full">
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          {post.status === "RECRUITING" ? (
            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">구인중</Badge>
          ) : (
            <Badge variant="secondary">마감</Badge>
          )}
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {post.region}
          </span>
        </div>
        
        <h3 className="font-bold text-slate-800 line-clamp-2 mb-auto leading-snug">
          {post.title}
        </h3>
        
        <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center text-sm">
          <span className="font-bold text-slate-700">{post.fee}</span>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            {post.eventDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> D-{Math.ceil((new Date(post.eventDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> {post.currentCount}/{post.targetCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}