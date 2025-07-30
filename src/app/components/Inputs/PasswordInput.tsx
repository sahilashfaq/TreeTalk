import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "react-hook-form";

interface PasswordInputProps {
  id: string;
  label: string;
  error?: FieldError;
  register: any;
  placeholder?: string;
}

export default function PasswordInput({
  id,
  label,
  error,
  register,
  placeholder,
}: PasswordInputProps) {
  return (
    <div>
      <Label className="mb-1" htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        type="password"
        placeholder={placeholder}
        {...register(id)}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}
