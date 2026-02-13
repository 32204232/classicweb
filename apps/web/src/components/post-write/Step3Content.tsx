import { PostFormData } from "@/hooks/usePostForm";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  data: PostFormData;
  onChange: (key: keyof PostFormData, value: any) => void;
}

export default function Step3Content({ data, onChange }: Props) {
  
  // ★ 동적 플레이스홀더 로직
  const getPlaceholder = () => {
    switch (data.category) {
      case "GRADUATION": return "예) 학교 / 곡명(악장 포함) / 리허설 횟수 / 교수님 스타일 / 원하는 반주자 스타일";
      case "LESSON": return "예) 레슨 대상(취미/전공) / 장소(방문가능 여부) / 경력 / 커리큘럼 / 시범 연주 가능 여부";
      case "PERFORMANCE_EXAM": return "예) 곡명 / 반주 필요 시간 / 학교 위치";
      case "CONCERT_PR": return "예) 연주회 프로그램 / 티켓 가격 / 할인 정보 / 예매 링크 설명";
      default: return "구체적인 내용과 일정, 조건을 적어주세요.";
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-xl font-bold text-slate-800">상세 내용을 적어주세요</h2>
      
      <div className="space-y-2">
        <Label>제목</Label>
        <Input 
          placeholder={data.category === "CONCERT_PR" ? "예) 제 1회 정기 연주회에 초대합니다" : "예) 8/28 한예종 졸연 반주 구합니다"}
          className="h-12"
          value={data.title}
          onChange={(e) => onChange("title", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>내용</Label>
        <Textarea 
          placeholder={getPlaceholder()} 
          className="min-h-[150px] resize-none p-4 text-base leading-relaxed"
          value={data.content}
          onChange={(e) => onChange("content", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>
          {data.category === "CONCERT_PR" ? "예매/문의 링크 (공개)" : "연락처 (매칭 시 공개)"}
        </Label>
        <div className="flex gap-2">
          <Select value={data.contactType} onValueChange={(v) => onChange("contactType", v)}>
            <SelectTrigger className="w-[130px] h-12"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="KAKAO_ID">카톡 ID</SelectItem>
              <SelectItem value="PHONE_NUMBER">전화번호</SelectItem>
              <SelectItem value="OPEN_CHAT_URL">오픈채팅</SelectItem>
              <SelectItem value="INSTAGRAM">인스타</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            placeholder="ID 또는 번호 입력" 
            className="h-12" 
            value={data.contactValue}
            onChange={(e) => onChange("contactValue", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}