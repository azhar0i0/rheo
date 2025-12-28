import { BottomNav } from "./BottomNav";
import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  className?: string;
}

export function MobileLayout({ children, showNav = true, className = "" }: MobileLayoutProps) {
  return (
    <div className={`min-h-screen bg-background max-w-md mx-auto relative ${className}`}>
      <main className={`${showNav ? "pb-20" : ""} safe-bottom`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
