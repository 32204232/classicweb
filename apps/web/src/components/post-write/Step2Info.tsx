import { PostFormData } from "@/hooks/usePostForm";
import { useStaticEnums } from "@/hooks/useStaticEnums";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ★ 만든 컴포넌트 가져오기 (경로 확인!)
import { CategorySelector } from "@/components/shared/CategorySelector"; 

interface Props {
  data: PostFormData;
  onChange: (key: keyof PostFormData, value: any) => void;
}

export default function Step2Info({ data, onChange }: Props) {
  const { regions } = useStaticEnums(); 
  // (parts는 이제 CategorySelector 안에 하드코딩된 데이터를 쓰거나, 나중에 API로 연결하면 됩니다)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-xl font-bold text-slate-800">누구를, 어디서 구하나요?</h2>
      
      {/* 1. 모집 파트 (서랍형 UI 적용!) */}
      <div className="space-y-3">
        <Label className="text-lg">모집 파트</Label>
        
        {/* ★ 드롭다운(Select) 삭제하고 이걸로 교체! */}
        <div className="border rounded-xl overflow-hidden">
            <CategorySelector 
            selectedPart={data.recruitPart} 
            onSelect={(val) => onChange("recruitPart", val)} 
            />
        </div>

        {/* 선택된 값 확인용 텍스트 (선택 사항) */}
        {data.recruitPart && (
            <p className="text-sm text-primary font-medium text-right animate-in fade-in">
                선택됨: <b>{data.recruitPart}</b>
            </p>
        )}
      </div>

      {/* 2. 지역 선택 (기존 드롭다운 유지) */}
      <div className="space-y-3">
        <Label className="text-lg">활동 지역</Label>
        <Select value={data.region} onValueChange={(v) => onChange("region", v)}>
          <SelectTrigger className="h-12 text-base"><SelectValue placeholder="지역 선택" /></SelectTrigger>
          <SelectContent>
            {regions.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}