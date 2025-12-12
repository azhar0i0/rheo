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
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2">
      <div className="max-w-md mx-auto">
        <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-[28px] shadow-xl shadow-foreground/5">
          <div className="flex items-center justify-around py-2 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="group relative flex flex-col items-center gap-1 py-2.5 px-5 rounded-2xl transition-all duration-300 text-muted-foreground hover:text-foreground"
                activeClassName="text-primary"
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    {isActive && (
                      <div className="absolute inset-0 bg-primary/10 rounded-2xl" />
                    )}
                    <div className="relative">
                      <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                      )}
                    </div>
                    <span className={`text-[10px] font-medium relative transition-all duration-300 ${isActive ? 'text-primary' : ''}`}>
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
