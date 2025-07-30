import { JSX, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function Typography({
  variant = "h1",
  className,
  children,
  onClick,
}: TypographyProps) {
  const baseClasses = {
    h1: "text-4xl font-bold text-[#ff5d2e] cursor-pointer hover:text-[#ff5d2e]",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-medium",
    h4: "text-xl font-medium",
    p: "text-base",
    span: "text-sm",
  };

  const Tag = variant as keyof JSX.IntrinsicElements;

  return (
    <Tag className={cn(baseClasses[variant], className)} onClick={onClick}>
      {children}
    </Tag>
  );
}
