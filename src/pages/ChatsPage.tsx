import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Search, Hash, Plus, MessageCircle, BellOff, Lock } from "lucide-react";
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
    
    if (filter === "unread") {
      result = result.filter(c => c.unread > 0);
    } else if (filter === "dms") {
      result = [];
    }
    
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
    
    if (filter === "unread") {
      result = result.filter(dm => dm.unread > 0);
    } else if (filter === "channels") {
      result = [];
    }
    
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
      case "offline": return "bg-muted-foreground/50";
    }
  };

  return (
    <MobileLayout>
      {/* Header with Notifications */}
      <PageHeader 
        title="Messages" 
        subtitle={totalUnread > 0 ? `${totalUnread} unread message${totalUnread > 1 ? 's' : ''}` : undefined}
        actions={
          <Button size="icon" className="w-10 h-10 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5" />
          </Button>
        }
      />

      <div className="px-4 pt-4 pb-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-12 rounded-2xl bg-secondary/50 border-0 focus:bg-secondary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { key: "all", label: "All" },
            { key: "unread", label: "Unread" },
            { key: "channels", label: "Channels" },
            { key: "dms", label: "Direct" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as FilterType)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                filter === f.key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="px-4">
        {/* Channels Section */}
        {(filter === "all" || filter === "channels" || filter === "unread") && filteredChannels.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Channels
                </span>
              </div>
              <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
                {filteredChannels.length}
              </span>
            </div>
            
            <div className="space-y-1.5">
              {filteredChannels.map((channel, index) => (
                <button
                  key={channel.id}
                  onClick={() => handleChannelClick(channel.name)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-card/50 hover:bg-secondary/70 active:scale-[0.98] transition-all duration-200 border border-transparent hover:border-border/50"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center relative shrink-0">
                    <Hash className="w-5 h-5 text-primary" />
                    {channel.isPrivate && (
                      <Lock className="w-3 h-3 text-muted-foreground absolute -bottom-0.5 -right-0.5 bg-background rounded-full p-0.5" />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold truncate ${channel.unread > 0 ? 'text-foreground' : 'text-foreground/80'}`}>
                        {channel.name}
                      </span>
                      {channel.isMuted && (
                        <BellOff className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className={`text-sm truncate ${channel.unread > 0 ? 'text-foreground/80 font-medium' : 'text-muted-foreground'}`}>
                        {channel.lastMessage}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground/70">
                        {channel.members} members
                      </span>
                      <span className="text-[10px] text-muted-foreground/70">•</span>
                      <span className="text-[10px] text-muted-foreground/70">
                        {channel.lastMessageTime}
                      </span>
                    </div>
                  </div>
                  {channel.unread > 0 && !channel.isMuted && (
                    <span className="px-2.5 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full min-w-[24px] text-center shadow-lg shadow-primary/20">
                      {channel.unread}
                    </span>
                  )}
                  {channel.unread > 0 && channel.isMuted && (
                    <span className="w-2.5 h-2.5 bg-muted-foreground/50 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Direct Messages Section */}
        {(filter === "all" || filter === "dms" || filter === "unread") && filteredDMs.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Direct Messages
                </span>
              </div>
              <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
                {filteredDMs.length}
              </span>
            </div>
            
            <div className="space-y-1.5">
              {filteredDMs.map((dm, index) => (
                <button
                  key={dm.id}
                  onClick={() => handleDMClick(dm.name)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-card/50 hover:bg-secondary/70 active:scale-[0.98] transition-all duration-200 border border-transparent hover:border-border/50"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative shrink-0">
                    <Avatar className="w-12 h-12 ring-2 ring-background">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-foreground font-semibold">
                        {dm.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-background ${getStatusColor(dm.status)}`}
                    />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-semibold truncate ${dm.unread > 0 ? 'text-foreground' : 'text-foreground/80'}`}>
                        {dm.name}
                      </span>
                      <span className={`text-xs shrink-0 ${dm.unread > 0 ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                        {dm.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <p className={`text-sm truncate ${dm.unread > 0 ? 'text-foreground/80 font-medium' : 'text-muted-foreground'}`}>
                        {dm.lastMessage}
                      </p>
                      {dm.unread > 0 && (
                        <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
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

        {/* Empty States */}
        {filteredChannels.length === 0 && filteredDMs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No conversations found</h3>
            <p className="text-sm text-muted-foreground">
              {filter === "unread" ? "You're all caught up!" : "Try a different search term"}
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
