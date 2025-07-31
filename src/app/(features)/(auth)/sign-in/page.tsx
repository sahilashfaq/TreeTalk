"use client";

import { Button } from "@/components/ui/button";
import Typography from "@/app/components/Typography";
import TextInput from "@/app/components/Inputs/TextInput";
import PasswordInput from "@/app/components/Inputs/PasswordInput";
import { ROUTES } from "@/app/constants";
import { useAuthData } from "../hooks/useAuthData";

export default function SignInPage() {
  const { onSubmit, handleSubmit, register, isPending, errors, router } =
    useAuthData();

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
