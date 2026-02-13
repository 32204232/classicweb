import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { http } from "@/api/http";
import { toast } from "sonner"; // ★ Sonner 사용

export interface PostFormData {
  category: string;
  recruitPart: string;
  region: string;
  title: string;
  content: string;
  contactType: string;
  contactValue: string;
  fee: string;
  eventDate: string;
  targetCount: number;
  isUrgent: boolean;
}

export const usePostForm = () => {
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<PostFormData>({
    category: "",
    recruitPart: "",
    region: "",
    title: "",
    content: "",
    contactType: "KAKAO_ID",
    contactValue: "",
    fee: "",
    eventDate: "",
    targetCount: 1,
    isUrgent: false,
  });

  // 연락처 자동완성
  useEffect(() => {
    const savedContact = localStorage.getItem("lastContactValue");
    const savedType = localStorage.getItem("lastContactType");
    if (savedContact) {
      setFormData(prev => ({
        ...prev,
        contactValue: savedContact,
        contactType: savedType || "KAKAO_ID"
      }));
    }
  }, []);

  const handleChange = (key: keyof PostFormData, value: any) => {
    // 과거 날짜 방지
    if (key === "eventDate" && value) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        // ★ Sonner 에러 알림
        toast.error("날짜 선택 오류", {
          description: "과거 날짜는 선택할 수 없습니다.",
        });
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const submitForm = async () => {
    try {
      setIsLoading(true);

      const payload = {
        ...formData,
        eventDate: formData.eventDate ? `${formData.eventDate}T00:00:00` : null,
      };

      await http.post("/posts", payload);

      localStorage.setItem("lastContactValue", formData.contactValue);
      localStorage.setItem("lastContactType", formData.contactType);

      // ★ Sonner 성공 알림
      toast.success("공고 등록 완료! 🎉", {
        description: "새로운 파트너를 곧 만나실 거예요.",
      });

      router.push("/"); 
      
    } catch (error) {
      console.error("글쓰기 실패:", error);
      // ★ Sonner 실패 알림
      toast.error("등록 실패", {
        description: "입력 정보를 다시 확인해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    formData,
    isLoading,
    handleChange,
    nextStep,
    prevStep,
    submitForm,
  };
};