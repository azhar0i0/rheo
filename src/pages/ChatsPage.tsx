import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Search, Hash, Users, Plus, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const channels = [
  { id: 1, name: "general", unread: 3, members: 24 },
  { id: 2, name: "announcements", unread: 0, members: 48 },
  { id: 3, name: "engineering", unread: 12, members: 16 },
  { id: 4, name: "design", unread: 1, members: 8 },
  { id: 5, name: "random", unread: 0, members: 32 },
];

const directMessages = [
  { id: 1, name: "Sarah Chen", initials: "SC", status: "online" as const, lastMessage: "Sure, let's sync up tomorrow", time: "2m", unread: 2 },
  { id: 2, name: "Mike Johnson", initials: "MJ", status: "offline" as const, lastMessage: "The report looks great!", time: "1h", unread: 0 },
  { id: 3, name: "Emily Davis", initials: "ED", status: "online" as const, lastMessage: "Can you review the PR?", time: "3h", unread: 1 },
  { id: 4, name: "Alex Kim", initials: "AK", status: "offline" as const, lastMessage: "Thanks for the update", time: "1d", unread: 0 },
];

export default function ChatsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredChannels = useMemo(() => {
    if (!searchQuery.trim()) return channels;
    return channels.filter(channel => 
      channel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredDMs = useMemo(() => {
    if (!searchQuery.trim()) return directMessages;
    return directMessages.filter(dm => 
      dm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dm.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleChannelClick = (channelName: string) => {
    navigate(`/chat/${encodeURIComponent(channelName)}?type=channel`);
  };

  const handleDMClick = (dmName: string) => {
    navigate(`/chat/${encodeURIComponent(dmName)}`);
  };

  const totalUnread = channels.reduce((acc, c) => acc + c.unread, 0) + 
    directMessages.reduce((acc, dm) => acc + dm.unread, 0);

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Messages</h1>
            {totalUnread > 0 && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {totalUnread} unread message{totalUnread > 1 ? 's' : ''}
              </p>
            )}
          </div>
          <Button size="icon" className="rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
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
            className="h-12 pl-12 rounded-2xl bg-secondary/50 border-0 focus:bg-secondary transition-colors"
          />
        </div>
      </div>
      
      <div className="px-4">
        {/* Channels Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Channels
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{filteredChannels.length}</span>
          </div>
          
          {filteredChannels.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No channels found
            </div>
          ) : (
            <div className="space-y-1">
              {filteredChannels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => handleChannelClick(channel.name)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-secondary/70 active:scale-[0.98] transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Hash className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium text-foreground block">{channel.name}</span>
                      <span className="text-xs text-muted-foreground">{channel.members} members</span>
                    </div>
                  </div>
                  {channel.unread > 0 && (
                    <span className="px-2.5 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full min-w-[24px] text-center">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Direct Messages Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Direct Messages
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{filteredDMs.length}</span>
          </div>
          
          {filteredDMs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No conversations found
            </div>
          ) : (
            <div className="space-y-1">
              {filteredDMs.map((dm) => (
                <button
                  key={dm.id}
                  onClick={() => handleDMClick(dm.name)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl hover:bg-secondary/70 active:scale-[0.98] transition-all duration-200"
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12 ring-2 ring-background">
                      <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
                        {dm.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-background ${
                        dm.status === "online" ? "bg-success" : "bg-muted-foreground/50"
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-medium truncate ${dm.unread > 0 ? 'text-foreground' : 'text-foreground/80'}`}>
                        {dm.name}
                      </span>
                      <span className={`text-xs shrink-0 ${dm.unread > 0 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                        {dm.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <p className={`text-sm truncate ${dm.unread > 0 ? 'text-foreground/80' : 'text-muted-foreground'}`}>
                        {dm.lastMessage}
                      </p>
                      {dm.unread > 0 && (
                        <span className="w-5 h-5 bg-primary text-primary-foreground text-xs font-semibold rounded-full flex items-center justify-center shrink-0">
                          {dm.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
