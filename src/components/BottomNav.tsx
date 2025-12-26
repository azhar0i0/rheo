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
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div className="relative">
          {/* Glass morphism background */}
          <div className="absolute inset-0 bg-card/80 backdrop-blur-xl rounded-[26px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-border/30" />
          
          {/* Nav content */}
          <div className="relative flex items-center justify-around py-2.5 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="group relative flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all duration-300 text-muted-foreground hover:text-foreground"
                activeClassName="text-primary"
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    {/* Active background with animation */}
                    <div 
                      className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary/10 scale-100 opacity-100' 
                          : 'bg-transparent scale-95 opacity-0 group-hover:bg-secondary/50 group-hover:scale-100 group-hover:opacity-100'
                      }`}
                    />
                    
                    {/* Icon with bounce effect */}
                    <div className="relative z-10">
                      <item.icon 
                        className={`w-[22px] h-[22px] transition-all duration-300 ${
                          isActive 
                            ? 'scale-110 text-primary' 
                            : 'group-hover:scale-105'
                        }`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      
                      {/* Active indicator dot */}
                      <div 
                        className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-all duration-300 ${
                          isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                        }`}
                      />
                    </div>
                    
                    {/* Label with fade */}
                    <span 
                      className={`relative z-10 text-[10px] font-semibold tracking-wide transition-all duration-300 ${
                        isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
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
