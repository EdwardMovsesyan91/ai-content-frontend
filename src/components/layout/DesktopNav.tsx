import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuthStore } from "@/store/useAuthStore";

export default function DesktopNav() {
  const logout = useAuthStore((s) => s.setToken);

  return (
    <div className="hidden md:flex items-center gap-6 text-muted-foreground">
      <Link to="/posts" className="hover:text-foreground transition-colors">
        Posts
      </Link>
      <Link to="/dashboard" className="hover:text-foreground transition-colors">
        Dashboard
      </Link>
      <button
        onClick={() => logout(null)}
        className="hover:text-foreground transition-colors"
      >
        Logout
      </button>
      <ThemeToggle />
    </div>
  );
}
