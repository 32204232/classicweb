"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge"; // ★ 추가
import { CategorySelector } from "@/components/shared/CategorySelector"; 
import { RegionSelector } from "@/components/shared/RegionSelector";
import { RotateCcw, X } from "lucide-react";

interface FilterSidebarProps {
  filters: {
    parts: string[]; // ★ 배열로 변경
    region: string;
    fee: string;
  };
  onChange: (key: string, value: any) => void;
  onReset: () => void;
}

const FEE_OPTIONS = ["협의 가능", "5만원 이하", "10만원 이하", "15만원 이하", "20만원 이하", "30만원 이상"];

export default function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
  
  // 파트 선택/해제 핸들러
  const handlePartToggle = (part: string) => {
    const currentParts = filters.parts;
    const newParts = currentParts.includes(part)
      ? currentParts.filter(p => p !== part) // 있으면 뺌
      : [...currentParts, part]; // 없으면 넣음
    
    onChange("parts", newParts);
  };

  return (
    <div className="w-64 space-y-8 sticky top-24 h-[calc(100vh-100px)] overflow-y-auto pr-4 hidden md:block">
      
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg text-slate-800">상세 필터</h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="text-slate-400 hover:text-slate-600 h-8 px-2 text-xs">
          <RotateCcw className="w-3 h-3 mr-1" /> 초기화
        </Button>
      </div>

      {/* ★ 선택된 파트 태그 보여주기 */}
      {filters.parts.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {filters.parts.map(part => (
            <Badge key={part} variant="secondary" className="px-2 py-0.5 text-xs cursor-pointer hover:bg-slate-200" onClick={() => handlePartToggle(part)}>
              {part} <X className="ml-1 w-3 h-3" />
            </Badge>
          ))}
        </div>
      )}

      {/* 1. 파트 필터 (다중 선택) */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-slate-700">전공 파트</Label>
        <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
           <CategorySelector 
             selectedParts={filters.parts} // 배열 넘김
             onToggle={handlePartToggle}   // 토글 함수 넘김
           />
        </div>
      </div>

      {/* 2. 지역 필터 (단일 선택 유지 - 필요하면 이것도 다중으로 변경 가능) */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-slate-700">활동 지역</Label>
        <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
            <RegionSelector 
              selectedRegion={filters.region} 
              selectedDistrict="" 
              onSelect={(region) => onChange("region", region)} 
            />
        </div>
      </div>

      {/* 3. 금액 필터 */}
      <div className="space-y-3 pb-10">
        <Label className="text-sm font-semibold text-slate-700">사례비</Label>
        <div className="flex flex-wrap gap-2">
          {FEE_OPTIONS.map((fee) => (
            <button
              key={fee}
              onClick={() => onChange("fee", filters.fee === fee ? "" : fee)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                filters.fee === fee
                  ? "bg-primary text-white border-primary font-bold shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-primary/50 hover:bg-slate-50"
              }`}
            >
              {fee}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}