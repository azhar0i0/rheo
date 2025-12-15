import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Send, Paperclip, Smile, Info, X, Image, FileText, Pin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MessageBubble, type Message } from "@/components/chat/MessageBubble";
import { ChannelInfoPanel } from "@/components/chat/ChannelInfoPanel";
import { ForwardMessageDialog } from "@/components/chat/ForwardMessageDialog";

const mockMessages: Record<string, Message[]> = {
  "Sarah Chen": [
    { id: 1, sender: "Sarah Chen", initials: "SC", content: "Hey! How's the project going?", time: "10:30 AM", date: "Today", isMe: false, status: "seen" },
    { id: 2, sender: "You", initials: "JD", content: "Going great! Just finished the UI designs", time: "10:32 AM", date: "Today", isMe: true, status: "seen", reactions: [{ emoji: "👍", count: 1, reacted: false }] },
    { id: 3, sender: "Sarah Chen", initials: "SC", content: "That's awesome! Can you share them?", time: "10:33 AM", date: "Today", isMe: false },
    { id: 4, sender: "You", initials: "JD", content: "Sure, let's sync up tomorrow", time: "10:35 AM", date: "Today", isMe: true, status: "delivered" },
  ],
  "Mike Johnson": [
    { id: 1, sender: "Mike Johnson", initials: "MJ", content: "The report looks great!", time: "9:00 AM", date: "Today", isMe: false },
    { id: 2, sender: "You", initials: "JD", content: "Thanks! Took a while to get the data right", time: "9:05 AM", date: "Today", isMe: true, status: "seen" },
  ],
  "Emily Davis": [
    { id: 1, sender: "Emily Davis", initials: "ED", content: "Can you review the PR?", time: "3:00 PM", date: "Yesterday", isMe: false },
    { id: 2, sender: "You", initials: "JD", content: "On it! Will check by EOD", time: "3:15 PM", date: "Yesterday", isMe: true, status: "seen" },
  ],
  "Alex Kim": [
    { id: 1, sender: "Alex Kim", initials: "AK", content: "Thanks for the update", time: "2:00 PM", date: "2 days ago", isMe: false },
  ],
};

const channelMessages: Record<string, Message[]> = {
  general: [
    { id: 1, sender: "Sarah Chen", initials: "SC", content: "Good morning everyone! 🌅", time: "9:00 AM", date: "Today", isMe: false, reactions: [{ emoji: "👋", count: 3, reacted: true }] },
    { id: 2, sender: "Mike Johnson", initials: "MJ", content: "Morning! Ready for the standup?", time: "9:02 AM", date: "Today", isMe: false },
    { id: 3, sender: "You", initials: "JD", content: "Morning team! Yes, all set", time: "9:05 AM", date: "Today", isMe: true, status: "seen" },
    { id: 4, sender: "Admin", initials: "AD", content: "📌 Reminder: Team sync at 2 PM today. Please prepare your updates.", time: "9:30 AM", date: "Today", isMe: false, isPinned: true },
  ],
  announcements: [
    { id: 1, sender: "Admin", initials: "AD", content: "Office will be closed next Friday for maintenance", time: "10:00 AM", date: "Yesterday", isMe: false, isPinned: true },
  ],
  engineering: [
    { id: 1, sender: "Emily Davis", initials: "ED", content: "Deployed the new feature to staging", time: "2:00 PM", date: "Today", isMe: false },
    { id: 2, sender: "Alex Kim", initials: "AK", content: "Nice! Running tests now", time: "2:05 PM", date: "Today", isMe: false },
    { id: 3, sender: "You", initials: "JD", content: "Great work team! 🚀", time: "2:10 PM", date: "Today", isMe: true, status: "seen", reactions: [{ emoji: "🎉", count: 2, reacted: false }, { emoji: "🚀", count: 1, reacted: true }] },
  ],
  design: [
    { id: 1, sender: "Sarah Chen", initials: "SC", content: "New mockups are ready for review", time: "11:00 AM", date: "Today", isMe: false },
  ],
  random: [
    { id: 1, sender: "Mike Johnson", initials: "MJ", content: "Anyone up for lunch? 🍕", time: "12:00 PM", date: "Today", isMe: false },
  ],
};

const channelMembers = [
  { id: 1, name: "Sarah Chen", initials: "SC", role: "admin" as const, status: "online" as const },
  { id: 2, name: "Mike Johnson", initials: "MJ", role: "member" as const, status: "offline" as const },
  { id: 3, name: "Emily Davis", initials: "ED", role: "member" as const, status: "online" as const },
  { id: 4, name: "Alex Kim", initials: "AK", role: "member" as const, status: "offline" as const },
  { id: 5, name: "You", initials: "JD", role: "admin" as const, status: "online" as const },
];

export default function ChatConversationPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isChannel = searchParams.get("type") === "channel";
  const chatName = decodeURIComponent(id || "");
  
  const initialMessages = isChannel 
    ? channelMessages[chatName] || []
    : mockMessages[chatName] || [];
  
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [forwardingMessage, setForwardingMessage] = useState<Message | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [channelDescription, setChannelDescription] = useState("Team discussions and updates");
  const [currentChannelName, setCurrentChannelName] = useState(chatName);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pinnedMessages = useMemo(() => 
    messages.filter(m => m.isPinned), 
    [messages]
  );

  const groupedMessages = useMemo(() => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = "";
    
    messages.forEach(msg => {
      if (msg.date !== currentDate) {
        currentDate = msg.date;
        groups.push({ date: currentDate, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });
    
    return groups;
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (editingMessage) {
      setNewMessage(editingMessage.content);
      inputRef.current?.focus();
    }
  }, [editingMessage]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    if (editingMessage) {
      setMessages(prev => prev.map(m => 
        m.id === editingMessage.id 
          ? { ...m, content: newMessage, isEdited: true }
          : m
      ));
      setEditingMessage(null);
      setNewMessage("");
      toast.success("Message edited");
      return;
    }
    
    const message: Message = {
      id: Date.now(),
      sender: "You",
      initials: "JD",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: "Today",
      isMe: true,
      status: "sent",
      replyTo: replyingTo ? { sender: replyingTo.sender, content: replyingTo.content } : undefined,
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
    setReplyingTo(null);
    
    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, status: "delivered" } : m
      ));
    }, 1000);
    
    // Simulate typing indicator for DMs
    if (!isChannel) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply: Message = {
          id: Date.now() + 1,
          sender: chatName,
          initials: chatName.split(" ").map(n => n[0]).join(""),
          content: "Got it, thanks! 👍",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: "Today",
          isMe: false,
        };
        setMessages(prev => {
          const updated = prev.map(m => 
            m.id === message.id ? { ...m, status: "seen" as const } : m
          );
          return [...updated, reply];
        });
      }, 2000);
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
    setEditingMessage(null);
    inputRef.current?.focus();
  };

  const handleEdit = (message: Message) => {
    setEditingMessage(message);
    setReplyingTo(null);
  };

  const handleDelete = (messageId: number) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
    toast.success("Message deleted");
  };

  const handlePin = (messageId: number) => {
    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, isPinned: !m.isPinned } : m
    ));
    const msg = messages.find(m => m.id === messageId);
    toast.success(msg?.isPinned ? "Message unpinned" : "Message pinned");
  };

  const handleReact = (messageId: number, emoji: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id !== messageId) return m;
      
      const reactions = m.reactions || [];
      const existingIdx = reactions.findIndex(r => r.emoji === emoji);
      
      if (existingIdx >= 0) {
        const existing = reactions[existingIdx];
        if (existing.reacted) {
          // Remove reaction
          if (existing.count === 1) {
            return { ...m, reactions: reactions.filter((_, i) => i !== existingIdx) };
          }
          return { 
            ...m, 
            reactions: reactions.map((r, i) => 
              i === existingIdx ? { ...r, count: r.count - 1, reacted: false } : r
            )
          };
        } else {
          // Add to existing
          return { 
            ...m, 
            reactions: reactions.map((r, i) => 
              i === existingIdx ? { ...r, count: r.count + 1, reacted: true } : r
            )
          };
        }
      } else {
        // New reaction
        return { ...m, reactions: [...reactions, { emoji, count: 1, reacted: true }] };
      }
    }));
  };

  const handleForward = (message: Message) => {
    setForwardingMessage(message);
  };

  const handleForwardConfirm = (targetId: number, targetType: "channel" | "dm") => {
    toast.success("Message forwarded");
  };

  const handleMute = (duration: string) => {
    setIsMuted(true);
    toast.success(`Channel muted${duration !== "forever" ? ` for ${duration}` : ""}`);
  };

  const handleUnmute = () => {
    setIsMuted(false);
    toast.success("Channel unmuted");
  };

  const handleRenameChannel = (name: string) => {
    setCurrentChannelName(name);
    toast.success("Channel renamed");
  };

  const handleUpdateDescription = (description: string) => {
    setChannelDescription(description);
    toast.success("Description updated");
  };

  const handleGoToPinnedMessage = (messageId: number) => {
    setShowInfoPanel(false);
    // In a real app, would scroll to the message
    const element = document.getElementById(`message-${messageId}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const cancelReplyOrEdit = () => {
    setReplyingTo(null);
    setEditingMessage(null);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl"
            onClick={() => navigate("/chats")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {isChannel ? "#" : chatName.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-foreground truncate">
                {isChannel ? `#${currentChannelName}` : chatName}
              </h1>
              {isChannel ? (
                <p className="text-xs text-muted-foreground truncate">{channelMembers.length} members</p>
              ) : (
                <p className="text-xs text-success">Online</p>
              )}
            </div>
          </div>
          {isChannel && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-xl"
              onClick={() => setShowInfoPanel(true)}
            >
              <Info className="w-5 h-5" />
            </Button>
          )}
        </div>
        
        {/* Pinned Messages Banner */}
        {pinnedMessages.length > 0 && (
          <button 
            onClick={() => setShowInfoPanel(true)}
            className="mt-2 w-full flex items-center gap-2 px-3 py-2 bg-warning/10 rounded-xl text-left"
          >
            <Pin className="w-4 h-4 text-warning" />
            <span className="text-sm text-foreground flex-1 truncate">
              {pinnedMessages.length} pinned message{pinnedMessages.length > 1 ? "s" : ""}
            </span>
          </button>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {groupedMessages.map((group) => (
          <div key={group.date}>
            {/* Date Separator */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium px-2">{group.date}</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            
            <div className="space-y-4">
              {group.messages.map((message) => (
                <div key={message.id} id={`message-${message.id}`}>
                  <MessageBubble
                    message={message}
                    isChannel={isChannel}
                    onReply={handleReply}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onPin={handlePin}
                    onReact={handleReact}
                    onForward={handleForward}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 mt-4">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                {chatName.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply/Edit Preview */}
      {(replyingTo || editingMessage) && (
        <div className="px-4 py-2 bg-secondary/50 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-1 h-8 rounded-full ${editingMessage ? "bg-warning" : "bg-primary"}`} />
              <div>
                <p className="text-xs font-medium text-foreground">
                  {editingMessage ? "Editing message" : `Replying to ${replyingTo?.sender}`}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-[250px]">
                  {editingMessage?.content || replyingTo?.content}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="w-7 h-7" onClick={cancelReplyOrEdit}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="sticky bottom-0 bg-card/95 backdrop-blur-lg border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl shrink-0">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </Button>
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder={editingMessage ? "Edit message..." : "Type a message..."}
              className="h-11 pl-4 pr-12 rounded-2xl bg-secondary border-0"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-xl"
            >
              <Smile className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
          <Button 
            onClick={handleSend}
            disabled={!newMessage.trim()}
            size="icon" 
            className="rounded-xl shrink-0 bg-primary hover:bg-primary/90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Channel Info Panel */}
      {isChannel && (
        <ChannelInfoPanel
          isOpen={showInfoPanel}
          onClose={() => setShowInfoPanel(false)}
          channelName={currentChannelName}
          channelDescription={channelDescription}
          members={channelMembers}
          pinnedMessages={pinnedMessages}
          isMuted={isMuted}
          onMute={handleMute}
          onUnmute={handleUnmute}
          onRenameChannel={handleRenameChannel}
          onUpdateDescription={handleUpdateDescription}
          onGoToPinnedMessage={handleGoToPinnedMessage}
          canManage={true}
        />
      )}

      {/* Forward Message Dialog */}
      <ForwardMessageDialog
        isOpen={!!forwardingMessage}
        onClose={() => setForwardingMessage(null)}
        message={forwardingMessage}
        onForward={handleForwardConfirm}
      />
    </div>
  );
}
