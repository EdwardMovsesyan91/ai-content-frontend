import MobileMenu from "./MobileMenu";
import DesktopNav from "./DesktopNav";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b bg-background">
      <Link
        to="/dashboard"
        className="text-lg font-bold text-foreground flex items-center gap-2 animate-slide-in-left"
      >
        <span className="animate-caret-pulse text-purple-500 text-xl font-mono animate-caret-pulse inline-block">
          {">_"}
        </span>
        <span>AI Content</span>
      </Link>
      <DesktopNav />
      <MobileMenu />
    </header>
  );
}
