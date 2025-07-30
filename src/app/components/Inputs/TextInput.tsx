"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "react-hook-form";

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  error?: FieldError;
  register: any;
  placeholder?: string;
}

export default function TextInput({
  id,
  label,
  type = "text",
  error,
  register,
  placeholder,
}: TextInputProps) {
  return (
    <div>
      <Label className="mb-1" htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}
