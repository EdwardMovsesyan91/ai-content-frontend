import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
