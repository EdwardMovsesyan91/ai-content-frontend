import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth"; // ✅ Import login function
import type { AxiosError } from "axios";
import { loginSchema, type LoginFormData } from "@/schemas/loginSchema";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);

      toast.success("Logged in successfully!");
      navigate("/dashboard");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(`Login failed: ${error.response?.data?.message}`);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 text-foreground">
      <div
        className="w-full max-w-sm sm:max-w-md sm:min-w-[410px] rounded-2xl shadow-lg p-6 sm:p-8 space-y-6
             bg-card text-card-foreground animate-fade-in duration-500 ease-out"
      >
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="w-full"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
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
          Not registered?
          <Link
            to="/register"
            className="text-primary underline hover:text-primary/80 transition-colors ml-1"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
