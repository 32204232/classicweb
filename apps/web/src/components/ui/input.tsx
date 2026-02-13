import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // 1. 높이 증가 (h-12), 둥글기 증가 (rounded-xl)
        "flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-base shadow-sm transition-all",
        
        // 2. 파일 업로드 스타일
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        
        // 3. 플레이스홀더 색상 (연하게)
        "placeholder:text-muted-foreground",
        
        // 4. 포커스 효과 (갈색 링)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary",
        
        // 5. 비활성화 스타일
        "disabled:cursor-not-allowed disabled:opacity-50",
        
        className
      )}
      {...props}
    />
  )
}

export { Input }