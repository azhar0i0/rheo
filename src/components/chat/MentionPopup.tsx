import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Shield, ShieldCheck, Crown } from "lucide-react";

interface Member {
  id: number;
  name: string;
  initials: string;
  status: "online" | "offline";
  role?: string;
  username?: string;
}

interface MentionPopupProps {
  members: Member[];
  searchQuery: string;
  onSelect: (member: Member) => void;
  visible: boolean;
  onClose?: () => void;
}

const getRoleIcon = (role?: string) => {
  switch (role) {
    case "admin": return Crown;
    case "manager": return ShieldCheck;
    case "senior": return Shield;
    default: return null;
  }
};

const getRoleColor = (role?: string) => {
  switch (role) {
    case "admin": return "text-warning";
    case "manager": return "text-primary";
    case "senior": return "text-accent";
    default: return "text-muted-foreground";
  }
};

export function MentionPopup({ members, searchQuery, onSelect, visible, onClose }: MentionPopupProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < filteredMembers.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev > 0 ? prev - 1 : filteredMembers.length - 1
        );
      } else if (e.key === "Enter" && filteredMembers[selectedIndex]) {
        e.preventDefault();
        onSelect(filteredMembers[selectedIndex]);
      } else if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, selectedIndex, filteredMembers, onSelect, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const selectedElement = container.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!visible || filteredMembers.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50 max-h-56 overflow-y-auto animate-scale-in"
    >
      <div className="p-2">
        <div className="flex items-center justify-between px-3 pb-2 mb-1 border-b border-border/50">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Members
          </span>
          <span className="text-[10px] text-muted-foreground">
            {filteredMembers.length} found
          </span>
        </div>
        
        {filteredMembers.map((member, index) => {
          const RoleIcon = getRoleIcon(member.role);
          const roleColor = getRoleColor(member.role);
          
          return (
            <button
              key={member.id}
              data-index={index}
              onClick={() => onSelect(member)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left ${
                index === selectedIndex 
                  ? "bg-primary/10" 
                  : "hover:bg-secondary"
              }`}
            >
              <div className="relative">
                <Avatar className="w-9 h-9 ring-2 ring-background">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <span 
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
                    member.status === "online" ? "bg-success" : "bg-muted-foreground/50"
                  }`}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {member.name}
                  </p>
                  {RoleIcon && (
                    <RoleIcon className={`w-3.5 h-3.5 ${roleColor} shrink-0`} />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {member.username && (
                    <p className="text-xs text-primary">@{member.username}</p>
                  )}
                  <span className="text-[10px] text-muted-foreground">
                    {member.status === "online" ? "Active now" : "Offline"}
                  </span>
                </div>
              </div>
              
              {index === selectedIndex && (
                <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-md shrink-0">
                  Enter ↵
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Keyboard hint */}
      <div className="px-4 py-2 border-t border-border/50 bg-secondary/30">
        <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
          <span>↑↓ Navigate</span>
          <span>Enter Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
}
