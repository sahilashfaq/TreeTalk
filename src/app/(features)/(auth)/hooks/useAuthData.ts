import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/app/constants";
import AuthService from "@/app/services/AuthService";
import { showToast } from "@/app/components/Popups/Sonnet";
import { setCookie } from "cookies-next";
import { useAuthStore } from "@/app/store/useAuthStore";
const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type FormData = z.infer<typeof schema>;
export const useAuthData = () => {
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
  return { onSubmit, handleSubmit, register, isPending, errors, router };
};
