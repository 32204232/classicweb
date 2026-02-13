"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CategorySelector } from "@/components/shared/CategorySelector"; 
import { ChevronDown } from "lucide-react";

interface Props {
  selectedParts: string[]; // 부모로부터 받은 현재 선택된 값들
  onApply: (parts: string[]) => void; // 적용 함수
}

export default function CategoryFilterModal({ selectedParts, onApply }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  // 모달 내부에서만 쓰는 임시 상태
  const [tempSelected, setTempSelected] = useState<string[]>([]);

  // 모달 열릴 때, 부모의 값으로 초기화
  useEffect(() => {
    if (isOpen) {
      setTempSelected(selectedParts);
    }
  }, [isOpen, selectedParts]);

  // 체크/해제 로직 (토글)
  const handleToggle = (value: string) => {
    setTempSelected((prev) => 
      prev.includes(value) 
        ? prev.filter((item) => item !== value) // 있으면 뺌
        : [...prev, value] // 없으면 넣음
    );
  };

  // [선택 완료] 버튼 클릭 시
  const handleComplete = () => {
    onApply(tempSelected); // 부모에게 전달
    setIsOpen(false); // 닫기
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={`rounded-full border-slate-300 ${selectedParts.length > 0 ? 'text-primary border-primary bg-primary/5 font-bold' : 'text-slate-600'}`}>
          {selectedParts.length > 0 ? `악기 ${selectedParts.length}개 선택됨` : "전공 파트"} 
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-h-[85vh] flex flex-col p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>어떤 파트를 찾으세요?</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
            <CategorySelector 
                selectedParts={tempSelected} 
                onToggle={handleToggle} 
            />
        </div>

        <DialogFooter className="p-4 border-t bg-white">
          <Button onClick={handleComplete} className="w-full h-12 text-lg font-bold rounded-xl">
            선택 완료 {tempSelected.length > 0 && `(${tempSelected.length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}