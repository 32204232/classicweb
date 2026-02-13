import { FileMusic } from "lucide-react";
import { Post } from "@/api/posts";

export default function PromoCard({ post }: { post: Post }) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[4/3] bg-slate-200 rounded-xl mb-3 relative overflow-hidden flex items-center justify-center text-slate-400">
        {/* Placeholder for image */}
        <FileMusic className="w-10 h-10 opacity-20" />
      </div>
      <h3 className="font-bold text-lg text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
        {post.title}
      </h3>
      <p className="text-sm text-slate-500 mt-1">
        {post.eventDate?.split("T")[0]} | {post.region}
      </p>
    </div>
  );
}