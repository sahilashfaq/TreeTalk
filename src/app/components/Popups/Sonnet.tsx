"use client";

import { toast } from "sonner";

type ToastOptions = {
  message: string;
  description?: string;
  variant?: "success" | "error" | "warning" | "info";
  duration?: number;
};

export const showToast = ({
  message,
  description,
  variant = "info",
  duration = 3000,
}: ToastOptions) => {
  switch (variant) {
    case "success":
      toast.success(message, { description, duration });
      break;
    case "error":
      toast.error(message, { description, duration });
      break;
    case "warning":
      toast.warning(message, { description, duration });
      break;
    case "info":
    default:
      toast(message, { description, duration });
  }
};
