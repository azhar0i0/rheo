import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Hash, Users, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const channels = [
  { id: 1, name: "general", unread: 3 },
  { id: 2, name: "announcements", unread: 0 },
  { id: 3, name: "engineering", unread: 12 },
  { id: 4, name: "design", unread: 1 },
  { id: 5, name: "random", unread: 0 },
];

const directMessages = [
  { id: 1, name: "Sarah Chen", initials: "SC", status: "online" as const, lastMessage: "Sure, let's sync up tomorrow", time: "2m" },
  { id: 2, name: "Mike Johnson", initials: "MJ", status: "offline" as const, lastMessage: "The report looks great!", time: "1h" },
  { id: 3, name: "Emily Davis", initials: "ED", status: "online" as const, lastMessage: "Can you review the PR?", time: "3h" },
  { id: 4, name: "Alex Kim", initials: "AK", status: "offline" as const, lastMessage: "Thanks for the update", time: "1d" },
];

export default function ChatsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <Button size="icon" variant="ghost" className="rounded-xl">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-12 rounded-2xl bg-card border-border"
          />
        </div>
      </div>
      
      <div className="px-4">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Channels
            </span>
          </div>
          <div className="space-y-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Hash className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{channel.name}</span>
                </div>
                {channel.unread > 0 && (
                  <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Direct Messages
            </span>
          </div>
          <div className="space-y-1">
            {directMessages.map((dm) => (
              <button
                key={dm.id}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
                      {dm.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                      dm.status === "online" ? "bg-success" : "bg-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{dm.name}</span>
                    <span className="text-xs text-muted-foreground">{dm.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{dm.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
