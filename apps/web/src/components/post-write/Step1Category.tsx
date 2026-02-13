import { PostFormData } from "@/hooks/usePostForm";

interface Props {
  data: PostFormData;
  onChange: (key: keyof PostFormData, value: any) => void;
}

const CATEGORIES = [
  { value: "PERFORMANCE_EXAM", label: "실기시험", emoji: "📝" },
  { value: "GRADUATION", label: "졸업연주", emoji: "🎓" },
  { value: "LESSON", label: "레슨반주", emoji: "🎹" },
  { value: "CONCERT", label: "연주회", emoji: "🎻" },
  { value: "ENSEMBLE", label: "앙상블", emoji: "🎼" },
  { value: "CONCERT_PR", label: "연주회 홍보", emoji: "📢" },
  { value: "ETC", label: "기타", emoji: "🎸" },
];

export default function Step1Category({ data, onChange }: Props) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-xl font-bold text-slate-800">어떤 종류의 글인가요?</h2>
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onChange("category", cat.value)}
            className={`p-4 rounded-xl border text-left transition-all hover:shadow-md ${
              data.category === cat.value
                ? "border-primary bg-primary/5 text-primary font-bold ring-1 ring-primary"
                : "border-slate-200 hover:border-primary/50 text-slate-600"
            }`}
          >
            <span className="mr-2">{cat.emoji}</span> {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}