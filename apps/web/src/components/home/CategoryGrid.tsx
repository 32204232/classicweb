import Link from "next/link";
import { 
  Mic, Music, Music2, Music4, FileMusic, Church, GraduationCap, Guitar 
} from "lucide-react";

const CATEGORIES = [
  { icon: Music, label: "피아노", href: "/posts?part=PIANO" },
  { icon: Mic, label: "성악", href: "/posts?part=VOCAL" },
  { icon: Music2, label: "현악", href: "/posts?part=STRING" },
  { icon: Music4, label: "관악", href: "/posts?part=WIND" },
  { icon: FileMusic, label: "작곡/이론", href: "/posts?part=COMPOSITION" },
  { icon: Church, label: "교회/성가대", href: "/posts?category=CHOIR" },
  { icon: GraduationCap, label: "입시/레슨", href: "/posts?category=LESSON" },
  { icon: Guitar, label: "기타/실용", href: "/posts?category=ETC" },
];

export default function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-8 text-slate-800">카테고리별 찾기</h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link key={cat.label} href={cat.href} className="group">
              <div className="flex flex-col items-center gap-4 p-4 rounded-2xl hover:bg-emerald-50/50 transition-all duration-200 cursor-pointer border border-transparent hover:border-emerald-100 hover:shadow-sm">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">
                  {cat.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}