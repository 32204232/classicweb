import { PostFormData } from "@/hooks/usePostForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // ★ 스위치 컴포넌트
import { Calendar, Siren } from "lucide-react";

interface Props {
  data: PostFormData;
  onChange: (key: keyof PostFormData, value: any) => void;
}

const FEE_OPTIONS = ["협의 가능", "5만원 이하", "10만원 이하", "15만원 이하", "20만원 이하", "30만원 이상"];

export default function Step4Condition({ data, onChange }: Props) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-xl font-bold text-slate-800">조건을 설정해주세요</h2>
      
      {/* 1. 급구 스위치 */}
      <div className="flex items-center justify-between p-4 border border-rose-100 bg-rose-50/50 rounded-xl">
        <div className="flex items-center gap-3">
            <div className="bg-rose-100 p-2 rounded-full">
                <Siren className="w-5 h-5 text-rose-500" />
            </div>
            <div>
                <Label className="text-base font-bold text-rose-900">긴급 구인 (급구)</Label>
                <p className="text-xs text-rose-600">목록에서 빨간색으로 강조됩니다.</p>
            </div>
        </div>
        <Switch 
            checked={data.isUrgent} 
            onCheckedChange={(checked) => onChange("isUrgent", checked)} 
        />
      </div>

      {/* 2. 사례비 */}
      <div className="space-y-2">
        <Label>사례비</Label>
        <div className="grid grid-cols-2 gap-2">
          {FEE_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => onChange("fee", opt)}
              className={`py-3 px-3 rounded-lg text-sm border transition-all ${
                data.fee === opt 
                  ? "border-primary bg-primary/5 text-primary font-bold" 
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* 3. 날짜 & 인원 */}
      <div className="space-y-2">
        <Label>연주 날짜 (선택)</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input 
            type="date" 
            className="h-12 pl-10"
            value={data.eventDate}
            onChange={(e) => onChange("eventDate", e.target.value)}
          />
        </div>
        <p className="text-xs text-slate-400">입력하지 않으면 '상시모집'입니다.</p>
      </div>

      <div className="space-y-2">
        <Label>모집 인원</Label>
        <div className="flex items-center gap-4 border rounded-md p-2 w-fit bg-slate-50">
          <Button variant="ghost" size="sm" onClick={() => onChange("targetCount", Math.max(1, data.targetCount - 1))}>-</Button>
          <span className="text-xl font-bold w-8 text-center">{data.targetCount}</span>
          <Button variant="ghost" size="sm" onClick={() => onChange("targetCount", data.targetCount + 1)}>+</Button>
        </div>
      </div>
    </div>
  );
}