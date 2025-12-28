import { NavLink } from "@/components/NavLink";
import { MessageSquare, Building2, FileText, User, Home } from "lucide-react";

const navItems = [
  { to: "/chats", icon: MessageSquare, label: "Chats" },
  { to: "/office", icon: Building2, label: "Office" },
  { to: "/reports", icon: FileText, label: "Reports" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="max-w-md mx-auto">
        {/* iOS-style tab bar */}
        <div className="bg-card/95 backdrop-blur-lg border-t border-border">
          <div className="flex items-center justify-around px-2 pt-2 pb-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-0.5 py-1 px-4 min-w-[64px] touch-target"
                activeClassName="text-primary"
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    <item.icon 
                      className={`w-6 h-6 transition-colors ${
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      }`}
                      strokeWidth={isActive ? 2.5 : 1.75}
                    />
                    <span 
                      className={`text-[10px] font-medium transition-colors ${
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
