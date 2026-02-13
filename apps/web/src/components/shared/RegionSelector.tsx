"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ★ 지역 데이터 완비
const REGIONS = [
  {
    id: "SEOUL",
    label: "서울",
    districts: [
      "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
      "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
      "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
    ]
  },
  {
    id: "GYEONGGI",
    label: "경기",
    districts: [
      "수원시", "성남시", "의정부시", "안양시", "부천시", "광명시", "평택시", "동두천시",
      "안산시", "고양시", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시",
      "의왕시", "하남시", "용인시", "파주시", "이천시", "안성시", "김포시", "화성시"
    ]
  },
  {
    id: "INCHEON",
    label: "인천",
    districts: ["중구", "동구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서구"]
  },
  // ... 부산, 대구 등 추가 가능
];

interface RegionSelectorProps {
  selectedRegion: string; // 예: "SEOUL" (대분류) - 백엔드 Enum용
  selectedDistrict: string; // 예: "강남구" (소분류) - 텍스트 저장용
  onSelect: (region: string, district: string) => void;
}

export function RegionSelector({ selectedRegion, selectedDistrict, onSelect }: RegionSelectorProps) {
  return (
    <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {REGIONS.map((area) => (
        <AccordionItem key={area.id} value={area.id} className="border-b last:border-0">
          <AccordionTrigger className="px-5 py-4 text-base font-bold text-slate-800 hover:bg-slate-50 hover:no-underline transition-colors">
            {area.label}
          </AccordionTrigger>
          <AccordionContent className="p-0 bg-slate-50/50">
            <ul className="divide-y divide-slate-100">
              {/* '전체' 옵션 추가 */}
              <li 
                onClick={() => onSelect(area.id, "")}
                className={cn(
                  "flex items-center justify-between px-6 py-3.5 cursor-pointer hover:bg-primary/5",
                  selectedRegion === area.id && !selectedDistrict ? "bg-primary/10 text-primary font-bold" : "text-slate-600"
                )}
              >
                <span>{area.label} 전체</span>
                {selectedRegion === area.id && !selectedDistrict && <Check className="w-4 h-4 text-primary" />}
              </li>

              {area.districts.map((dist) => (
                <li 
                  key={dist}
                  onClick={() => onSelect(area.id, dist)}
                  className={cn(
                    "flex items-center justify-between px-6 py-3.5 cursor-pointer hover:bg-primary/5",
                    selectedDistrict === dist ? "bg-primary/10 text-primary font-bold" : "text-slate-600"
                  )}
                >
                  <span>{dist}</span>
                  {selectedDistrict === dist && <Check className="w-4 h-4 text-primary" />}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}