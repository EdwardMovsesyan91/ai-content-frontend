import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu, LayoutDashboard, FileText, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const logout = useAuthStore((s) => s.setToken);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden">
          <Menu className="w-6 h-6 text-foreground" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="top"
        aria-labelledby="mobile-menu-title"
        aria-describedby="mobile-menu-desc"
        className="bg-background/80 backdrop-blur border-b border-border text-foreground animate-in slide-in-from-top duration-300"
      >
        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Navigation and settings
        </SheetDescription>

        <nav className="px-6 py-6 space-y-6">
          <div className="space-y-4">
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-lg font-medium"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link
              to="/posts"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-lg font-medium"
            >
              <FileText className="w-5 h-5" />
              Posts
            </Link>
          </div>

          <hr className="h-px bg-muted/40 border-0" />

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>

          <button
            onClick={() => {
              logout(null);
              setOpen(false);
            }}
            className="flex items-center gap-2 text-lg font-medium text-left w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
