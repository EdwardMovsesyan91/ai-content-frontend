import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-sm sm:max-w-md sm:min-w-[410px]">
        <LoginForm />
      </div>
    </div>
  );
}
