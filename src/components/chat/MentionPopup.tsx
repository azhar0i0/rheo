import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Member {
  id: number;
  name: string;
  initials: string;
  status: "online" | "offline";
}

interface MentionPopupProps {
  members: Member[];
  searchQuery: string;
  onSelect: (member: Member) => void;
  visible: boolean;
}

export function MentionPopup({ members, searchQuery, onSelect, visible }: MentionPopupProps) {
  if (!visible) return null;

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredMembers.length === 0) return null;

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 max-h-48 overflow-y-auto">
      <div className="p-2">
        <p className="text-xs text-muted-foreground px-2 pb-2">Members</p>
        {filteredMembers.map((member) => (
          <button
            key={member.id}
            onClick={() => onSelect(member)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left"
          >
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
                member.status === "online" ? "bg-success" : "bg-muted-foreground"
              }`} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.status === "online" ? "Active now" : "Offline"}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
