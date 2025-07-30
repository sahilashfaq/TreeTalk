"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Typography from "@/app/components/Typography";
import TextInput from "@/app/components/Inputs/TextInput";
import PasswordInput from "@/app/components/Inputs/PasswordInput";
import { ROUTES } from "@/app/constants";
import Image from "next/image";
import AuthService from "@/app/services/AuthService";
import { showToast } from "@/app/components/Popups/Sonnet";
import { setCookie } from "cookies-next";
import { useAuthStore } from "@/app/store/useAuthStore";
const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function SignInPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { mutate: login, isPending } = useMutation({
    mutationFn: AuthService.login,

    onSuccess: (data: any) => {
      showToast({
        message: "Login Success",
        description: "You are logged in successfully.",
        variant: "success",
      });
      setCookie("token", data.token);
      useAuthStore.getState().setUser(data.user);
      router.push(ROUTES.DASHBOARD);
    },
    onError: (error: any) => {
      showToast({
        message: "Login Failed",
        description: `${error?.message}`,
        variant: "error",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center shadow-xl px-4">
      <div className="w-full max-w-md bg-[rgba(246,129,27,0.04)] shadow-xl p-8 rounded-xl border border-black">
        <Typography className="text-center">Sign In</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          <Button
            type="submit"
            className="w-full bg-[#ff5d2e] hover:bg-[#e14e1d]"
            disabled={isPending}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </Button>

          <Typography
            className="text-sm text-center text-black cursor-pointer"
            onClick={() => router.push(ROUTES.SIGN_UP)}
          >
            Don't have an account? Create one now!
          </Typography>
        </form>
      </div>
    </div>
  );
}
