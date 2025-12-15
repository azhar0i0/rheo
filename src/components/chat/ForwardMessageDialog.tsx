import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, Hash, Check } from "lucide-react";
import type { Message } from "./MessageBubble";

interface ForwardTarget {
  id: number;
  name: string;
  type: "channel" | "dm";
  initials?: string;
}

interface ForwardMessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: Message | null;
  onForward: (targetId: number, targetType: "channel" | "dm") => void;
}

const forwardTargets: ForwardTarget[] = [
  { id: 1, name: "general", type: "channel" },
  { id: 2, name: "announcements", type: "channel" },
  { id: 3, name: "engineering", type: "channel" },
  { id: 4, name: "Sarah Chen", type: "dm", initials: "SC" },
  { id: 5, name: "Mike Johnson", type: "dm", initials: "MJ" },
  { id: 6, name: "Emily Davis", type: "dm", initials: "ED" },
];

export function ForwardMessageDialog({
  isOpen,
  onClose,
  message,
  onForward,
}: ForwardMessageDialogProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = forwardTargets.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleForward = () => {
    const target = forwardTargets.find((t) => t.id === selected);
    if (target) {
      onForward(target.id, target.type);
      setSelected(null);
      setSearch("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Forward Message</DialogTitle>
        </DialogHeader>

        {message && (
          <div className="p-3 bg-secondary/50 rounded-xl mb-4">
            <p className="text-xs text-muted-foreground mb-1">{message.sender}</p>
            <p className="text-sm line-clamp-2">{message.content}</p>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search channels or people..."
            className="pl-10"
          />
        </div>

        <div className="max-h-[300px] overflow-y-auto space-y-1">
          {filtered.map((target) => (
            <button
              key={target.id}
              onClick={() => setSelected(target.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                selected === target.id
                  ? "bg-primary/10 border border-primary/30"
                  : "hover:bg-secondary"
              }`}
            >
              {target.type === "channel" ? (
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Hash className="w-4 h-4 text-primary" />
                </div>
              ) : (
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                    {target.initials}
                  </AvatarFallback>
                </Avatar>
              )}
              <span className="flex-1 text-left text-sm font-medium">
                {target.type === "channel" ? `#${target.name}` : target.name}
              </span>
              {selected === target.id && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleForward} disabled={!selected}>
            Forward
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
