"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Typography from "@/app/components/Typography";
import TextInput from "@/app/components/Inputs/TextInput";
import PasswordInput from "@/app/components/Inputs/PasswordInput";
import { ROUTES } from "@/app/constants";
import { showToast } from "@/app/components/Popups/Sonnet";

// 1. Zod schema
const schema = z.object({
  username: z.string().min(2, "Username is too short"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  role: z.enum(["Admin", "Service Provider", "Customer"], {
    errorMap: () => ({ message: "Select a role" }),
  }),
});

type FormData = z.infer<typeof schema>;

// 2. API call function
const registerUser = async (formData: FormData) => {
  const response = await axios.post(
    "http://localhost:3002/api/v1/auth/register",
    formData
  );

  const { token, user } = response.data;
  setCookie("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedRole = watch("role");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push(ROUTES.DASHBOARD);
      showToast({
        message: "Registered successfully!",
        description:
          "You can now access your dashboard and start using your account.",
        variant: "success",
      });
    },
    onError: (error: any) => {
      console.log("Sign Up Error =====> ", error);

      showToast({
        message: "Registration Error!",
        description: error?.response?.data?.message,
        variant: "error",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[rgba(246,129,27,0.04)] shadow-xl p-8 rounded-xl border border-black">
        <Typography className="text-center text-xl font-semibold mb-4">
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextInput
            id="username"
            label="Username"
            type="text"
            register={register}
            error={errors.username}
          />
          <TextInput
            id="email"
            label="Email"
            type="email"
            register={register}
            error={errors.email}
          />
          <PasswordInput
            id="password"
            label="Password"
            register={register}
            error={errors.password}
          />

          {/* ✅ SHADCN SELECT INTEGRATED WITH RHF */}
          <div>
            <label htmlFor="role" className="block font-medium mb-1">
              Role
            </label>
            <Select
              value={selectedRole}
              onValueChange={(value) =>
                setValue("role", value as FormData["role"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Service Provider">
                  Service Provider
                </SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
            )}
          </div>

          <Button
            className="w-full bg-[#ff5d2e] hover:bg-[#e14e1d]"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Signing up..." : "Sign Up"}
          </Button>

          <Typography
            className="text-sm text-black cursor-pointer text-center"
            onClick={() => router.push(ROUTES.SIGN_IN)}
          >
            Already have an account? Sign In.
          </Typography>
        </form>
      </div>
    </div>
  );
}
