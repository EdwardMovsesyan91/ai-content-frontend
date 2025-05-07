import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { signup } from "@/lib/auth";
import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/registerSchema";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setToken(data.token);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(`Signin failed: ${error.response?.data?.message}`);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm sm:max-w-md rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 bg-card text-card-foreground">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              className="w-full"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-4">
          Already registered?
          <Link
            to="/login"
            className="text-primary underline hover:text-primary/80 transition-colors ml-1"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
