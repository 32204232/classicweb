import { useState, useEffect } from 'react';
import { http } from '@/api/http';

// 드롭다운에 사용할 데이터 형태 정의
export interface EnumOption {
    label: string;
    value: string;
}

export const useStaticEnums = () => {
    const [parts, setParts] = useState<EnumOption[]>([]);
    const [regions, setRegions] = useState<EnumOption[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchEnums = async () => {
            try {
                // 1. 파트 목록 가져오기 (e.g., ["PIANO", "VOCAL", ...])
                // 백엔드 API: GET /api/auth/parts
                const partsResponse = await http.get<string[]>('/auth/parts');
                
                // 2. 드롭다운 형태로 가공 (value와 label을 동일하게 설정)
                const partOptions = partsResponse.data.map(value => ({ label: formatEnumLabel(value), value }));
                setParts(partOptions);

                // 3. 지역 목록 가져오기 (e.g., ["SEOUL", "GYEONGGI", ...])
                // 백엔드 API: GET /api/auth/regions
                const regionsResponse = await http.get<string[]>('/auth/regions');
                const regionOptions = regionsResponse.data.map(value => ({ label: formatEnumLabel(value), value }));
                setRegions(regionOptions);

            } catch (error) {
                console.error("Failed to fetch static enums:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEnums();
    }, []);

    // ENUM 대문자를 보기 좋은 글자로 변환하는 도우미 함수 (PIANO -> Piano)
    const formatEnumLabel = (value: string): string => {
        if (!value) return '';
        // 대문자를 띄어쓰기로 변환하고 첫 글자만 대문자로 만듦 (예: MASTER_CLASS -> Master Class)
        const formatted = value.toLowerCase().replace(/_/g, ' ');
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };


    return { parts, regions, isLoading };
};