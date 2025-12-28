import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Search, Hash, Plus, MessageCircle, BellOff, Lock, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Channel {
  id: number;
  name: string;
  description: string;
  unread: number;
  members: number;
  isMuted: boolean;
  isPrivate: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
}

interface DirectMessage {
  id: number;
  name: string;
  initials: string;
  status: "online" | "offline" | "away";
  lastMessage: string;
  time: string;
  unread: number;
}

const channels: Channel[] = [
  { id: 1, name: "general", description: "Company-wide announcements and discussions", unread: 3, members: 24, isMuted: false, isPrivate: false, lastMessage: "Good morning everyone! 🌅", lastMessageTime: "9:05 AM" },
  { id: 2, name: "announcements", description: "Official company announcements", unread: 0, members: 48, isMuted: true, isPrivate: false, lastMessage: "Office closed next Friday", lastMessageTime: "Yesterday" },
  { id: 3, name: "engineering", description: "Engineering team discussions", unread: 12, members: 16, isMuted: false, isPrivate: false, lastMessage: "Deployed to staging 🚀", lastMessageTime: "2:10 PM" },
  { id: 4, name: "design", description: "Design team collaboration", unread: 1, members: 8, isMuted: false, isPrivate: true, lastMessage: "New mockups ready", lastMessageTime: "11:00 AM" },
  { id: 5, name: "random", description: "Non-work banter and fun", unread: 0, members: 32, isMuted: false, isPrivate: false, lastMessage: "Anyone up for lunch? 🍕", lastMessageTime: "12:00 PM" },
];

const directMessages: DirectMessage[] = [
  { id: 1, name: "Sarah Chen", initials: "SC", status: "online", lastMessage: "Sure, let's sync up tomorrow", time: "2m", unread: 2 },
  { id: 2, name: "Mike Johnson", initials: "MJ", status: "offline", lastMessage: "The report looks great!", time: "1h", unread: 0 },
  { id: 3, name: "Emily Davis", initials: "ED", status: "online", lastMessage: "Can you review the PR?", time: "3h", unread: 1 },
  { id: 4, name: "Alex Kim", initials: "AK", status: "away", lastMessage: "Thanks for the update", time: "1d", unread: 0 },
];

type FilterType = "all" | "unread" | "channels" | "dms";

export default function ChatsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const navigate = useNavigate();

  const filteredChannels = useMemo(() => {
    let result = channels;
    if (searchQuery.trim()) {
      result = result.filter(channel => 
        channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filter === "unread") result = result.filter(c => c.unread > 0);
    else if (filter === "dms") result = [];
    return result;
  }, [searchQuery, filter]);

  const filteredDMs = useMemo(() => {
    let result = directMessages;
    if (searchQuery.trim()) {
      result = result.filter(dm => 
        dm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dm.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filter === "unread") result = result.filter(dm => dm.unread > 0);
    else if (filter === "channels") result = [];
    return result;
  }, [searchQuery, filter]);

  const handleChannelClick = (channelName: string) => {
    navigate(`/chat/${encodeURIComponent(channelName)}?type=channel`);
  };

  const handleDMClick = (dmName: string) => {
    navigate(`/chat/${encodeURIComponent(dmName)}`);
  };

  const totalUnread = channels.reduce((acc, c) => acc + c.unread, 0) + 
    directMessages.reduce((acc, dm) => acc + dm.unread, 0);

  const getStatusColor = (status: "online" | "offline" | "away") => {
    switch (status) {
      case "online": return "bg-success";
      case "away": return "bg-warning";
      case "offline": return "bg-muted-foreground/40";
    }
  };

  return (
    <MobileLayout>
      <PageHeader 
        title="Messages" 
        subtitle={totalUnread > 0 ? `${totalUnread} unread` : undefined}
        actions={
          <Button size="icon" variant="ghost" className="w-10 h-10 rounded-full">
            <Plus className="w-5 h-5" />
          </Button>
        }
      />

      <div className="px-4 pt-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-10 rounded-lg bg-secondary/60 border-0 text-sm placeholder:text-muted-foreground/70"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {[
            { key: "all", label: "All" },
            { key: "unread", label: "Unread" },
            { key: "channels", label: "Channels" },
            { key: "dms", label: "Direct" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as FilterType)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors press-scale ${
                filter === f.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Channels Section */}
      {(filter === "all" || filter === "channels" || filter === "unread") && filteredChannels.length > 0 && (
        <div className="mb-2">
          <div className="section-header flex items-center justify-between">
            <span>Channels</span>
            <span className="text-muted-foreground/60">{filteredChannels.length}</span>
          </div>
          
          <div className="bg-card">
            {filteredChannels.map((channel, index) => (
              <button
                key={channel.id}
                onClick={() => handleChannelClick(channel.name)}
                className="w-full list-row border-b border-border/50 last:border-b-0"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Hash className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium truncate ${channel.unread > 0 ? 'text-foreground' : 'text-foreground/80'}`}>
                      #{channel.name}
                    </span>
                    {channel.isPrivate && <Lock className="w-3 h-3 text-muted-foreground" />}
                    {channel.isMuted && <BellOff className="w-3 h-3 text-muted-foreground" />}
                  </div>
                  <p className={`text-sm truncate mt-0.5 ${channel.unread > 0 ? 'text-foreground/70' : 'text-muted-foreground'}`}>
                    {channel.lastMessage}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {channel.unread > 0 && !channel.isMuted ? (
                    <span className="min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full flex items-center justify-center">
                      {channel.unread}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">{channel.lastMessageTime}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Direct Messages Section */}
      {(filter === "all" || filter === "dms" || filter === "unread") && filteredDMs.length > 0 && (
        <div className="mb-2">
          <div className="section-header flex items-center justify-between">
            <span>Direct Messages</span>
            <span className="text-muted-foreground/60">{filteredDMs.length}</span>
          </div>
          
          <div className="bg-card">
            {filteredDMs.map((dm) => (
              <button
                key={dm.id}
                onClick={() => handleDMClick(dm.name)}
                className="w-full list-row border-b border-border/50 last:border-b-0"
              >
                <div className="relative shrink-0">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-medium">
                      {dm.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(dm.status)}`} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-medium truncate ${dm.unread > 0 ? 'text-foreground' : 'text-foreground/80'}`}>
                      {dm.name}
                    </span>
                    <span className={`text-xs shrink-0 ${dm.unread > 0 ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                      {dm.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <p className={`text-sm truncate ${dm.unread > 0 ? 'text-foreground/70' : 'text-muted-foreground'}`}>
                      {dm.lastMessage}
                    </p>
                    {dm.unread > 0 && (
                      <span className="min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full flex items-center justify-center shrink-0">
                        {dm.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredChannels.length === 0 && filteredDMs.length === 0 && (
        <div className="text-center py-16 px-8">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">No conversations</h3>
          <p className="text-sm text-muted-foreground">
            {filter === "unread" ? "You're all caught up!" : "Try a different search"}
          </p>
        </div>
      )}
    </MobileLayout>
  );
}
