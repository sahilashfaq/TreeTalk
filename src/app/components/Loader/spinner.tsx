// components/ui/loader.tsx
import { cn } from "@/lib/utils"; // Shadcn utility for class merging

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}
