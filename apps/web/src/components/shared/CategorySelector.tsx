"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// (데이터 부분은 기존과 동일하니 생략하고 아래 로직 부분만 바꿉니다)
// ... const INSTRUMENT_CATEGORIES = [ ... ] ...
const INSTRUMENT_CATEGORIES = [
  {
    id: "KEYBOARD",
    label: "🎹 건반악기",
    instruments: [
      { value: "PIANO", label: "피아노" },
      { value: "ORGAN", label: "오르간" },
      { value: "ACCORDION", label: "아코디언" },
    ],
  },
  {
    id: "STRING",
    label: "🎻 현악기",
    instruments: [
      { value: "VIOLIN", label: "바이올린" },
      { value: "VIOLA", label: "비올라" },
      { value: "CELLO", label: "첼로" },
      { value: "DOUBLE_BASS", label: "더블베이스" },
      { value: "HARP", label: "하프" },
      { value: "CLASSICAL_GUITAR", label: "클래식기타" },
    ],
  },
  {
    id: "WOODWIND",
    label: "🎷 목관악기",
    instruments: [
      { value: "FLUTE", label: "플루트" },
      { value: "PICCOLO", label: "피콜로" },
      { value: "OBOE", label: "오보에" },
      { value: "CLARINET", label: "클라리넷" },
      { value: "BASSOON", label: "바순" },
      { value: "SAXOPHONE", label: "색소폰" },
    ],
  },
  {
    id: "BRASS",
    label: "🎺 금관악기",
    instruments: [
      { value: "TRUMPET", label: "트럼펫" },
      { value: "TROMBONE", label: "트롬본" },
      { value: "HORN", label: "호른" },
      { value: "TUBA", label: "튜바" },
      { value: "EUPHONIUM", label: "유포니움" },
    ],
  },
  {
    id: "VOCAL",
    label: "🎤 성악",
    instruments: [
      { value: "SOPRANO", label: "소프라노" },
      { value: "MEZZO_SOPRANO", label: "메조소프라노" },
      { value: "COUNTER_TENOR", label: "카운터테너" },
      { value: "TENOR", label: "테너" },
      { value: "BARITONE", label: "바리톤" },
      { value: "BASS", label: "베이스" },
    ],
  },
  {
    id: "PERCUSSION",
    label: "🥁 타악기",
    instruments: [
      { value: "TIMPANI", label: "팀파니" },
      { value: "PERCUSSION", label: "타악기 전반" },
    ],
  },
  {
    id: "COMPOSITION",
    label: "🎼 작곡/지휘",
    instruments: [
      { value: "COMPOSITION", label: "작곡" },
      { value: "CONDUCTOR", label: "지휘" },
      { value: "CHORAL_CONDUCTOR", label: "합창지휘" },
    ],
  },
];

interface CategorySelectorProps {
  selectedParts: string[]; // ★ 배열로 변경!
  onToggle: (value: string) => void; // ★ 이름 변경 (선택/해제 토글)
}

export function CategorySelector({ selectedParts, onToggle }: CategorySelectorProps) {
  
  return (
    <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {INSTRUMENT_CATEGORIES.map((category) => (
        <AccordionItem key={category.id} value={category.id} className="border-b last:border-0">
          <AccordionTrigger className="px-5 py-4 text-base font-bold text-slate-800 hover:bg-slate-50 hover:no-underline transition-colors">
            {category.label}
          </AccordionTrigger>
          <AccordionContent className="p-0 bg-slate-50/50">
            <ul className="divide-y divide-slate-100">
              {category.instruments.map((inst) => {
                // ★ 배열에 포함되어 있는지 확인
                const isSelected = selectedParts.includes(inst.value);

                return (
                  <li 
                    key={inst.value}
                    onClick={() => onToggle(inst.value)}
                    className={cn(
                      "flex items-center justify-between px-6 py-3.5 cursor-pointer transition-all hover:bg-primary/5",
                      isSelected ? "bg-primary/10 text-primary font-bold" : "text-slate-600"
                    )}
                  >
                    <span>{inst.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-primary" />}
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}