import MobileMenu from "./MobileMenu";
import DesktopNav from "./DesktopNav";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
        <span className="text-purple-500 text-xl font-mono">{">_"}</span>
        <span>AI Content Dashboard</span>
      </h1>
      <DesktopNav />
      <MobileMenu />
    </header>
  );
}
