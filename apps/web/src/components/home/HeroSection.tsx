import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-24 px-4 bg-gradient-to-b from-emerald-50/50 to-white">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 text-center tracking-tight">
        연주자를 위한, 음악가를 위한
      </h1>
      <div className="relative w-full max-w-2xl">
        <Input
          type="text"
          placeholder="어떤 연주자를 찾으시나요?"
          className="h-16 pl-8 pr-16 text-lg rounded-full shadow-lg border-0 ring-1 ring-slate-200 focus-visible:ring-primary"
        />
        <Button
          size="icon"
          className="absolute right-3 top-3 h-10 w-10 rounded-full"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}