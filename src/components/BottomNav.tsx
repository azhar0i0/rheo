import { NavLink } from "@/components/NavLink";
import { MessageSquare, Building2, FileText, User } from "lucide-react";

const navItems = [
  { to: "/chats", icon: MessageSquare, label: "Chats" },
  { to: "/office", icon: Building2, label: "Office" },
  { to: "/reports", icon: FileText, label: "Reports" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 text-muted-foreground hover:text-primary"
            activeClassName="text-primary bg-primary/10"
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
