import { BottomNav } from "./BottomNav";

interface MobileLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  title?: string;
}

export function MobileLayout({ children, showNav = true, title }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {title && (
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border px-4 py-4">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </header>
      )}
      <main className={showNav ? "pb-24" : ""}>{children}</main>
      {showNav && <BottomNav />}
    </div>
  );
}
