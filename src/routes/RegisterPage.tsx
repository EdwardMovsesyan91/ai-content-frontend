import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-sm sm:max-w-md sm:min-w-[410px]">
        <RegisterForm />
      </div>
    </div>
  );
}
