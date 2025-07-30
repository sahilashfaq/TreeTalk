import { Button as ShadButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function Button({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <ShadButton
      variant={variant}
      size={size}
      style={{ background: "#ef5c34ff" }}
      className={cn(
        "rounded-lg transition active:scale-95 active:bg-primary-600 hover:bg-primary-500 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </ShadButton>
  );
}
