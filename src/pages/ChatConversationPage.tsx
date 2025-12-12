import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Send, Paperclip, Smile, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  sender: string;
  initials: string;
  content: string;
  time: string;
  isMe: boolean;
}

const mockMessages: Record<string, Message[]> = {
  "Sarah Chen": [
    { id: 1, sender: "Sarah Chen", initials: "SC", content: "Hey! How's the project going?", time: "10:30 AM", isMe: false },
    { id: 2, sender: "You", initials: "JD", content: "Going great! Just finished the UI designs", time: "10:32 AM", isMe: true },
    { id: 3, sender: "Sarah Chen", initials: "SC", content: "That's awesome! Can you share them?", time: "10:33 AM", isMe: false },
    { id: 4, sender: "You", initials: "JD", content: "Sure, let's sync up tomorrow", time: "10:35 AM", isMe: true },
  ],
  "Mike Johnson": [
    { id: 1, sender: "Mike Johnson", initials: "MJ", content: "The report looks great!", time: "9:00 AM", isMe: false },
    { id: 2, sender: "You", initials: "JD", content: "Thanks! Took a while to get the data right", time: "9:05 AM", isMe: true },
  ],
  "Emily Davis": [
    { id: 1, sender: "Emily Davis", initials: "ED", content: "Can you review the PR?", time: "Yesterday", isMe: false },
    { id: 2, sender: "You", initials: "JD", content: "On it! Will check by EOD", time: "Yesterday", isMe: true },
  ],
  "Alex Kim": [
    { id: 1, sender: "Alex Kim", initials: "AK", content: "Thanks for the update", time: "2 days ago", isMe: false },
  ],
};

const channelMessages: Record<string, Message[]> = {
  general: [
    { id: 1, sender: "Sarah Chen", initials: "SC", content: "Good morning everyone! 🌅", time: "9:00 AM", isMe: false },
    { id: 2, sender: "Mike Johnson", initials: "MJ", content: "Morning! Ready for the standup?", time: "9:02 AM", isMe: false },
    { id: 3, sender: "You", initials: "JD", content: "Morning team! Yes, all set", time: "9:05 AM", isMe: true },
  ],
  announcements: [
    { id: 1, sender: "Admin", initials: "AD", content: "Office will be closed next Friday for maintenance", time: "Yesterday", isMe: false },
  ],
  engineering: [
    { id: 1, sender: "Emily Davis", initials: "ED", content: "Deployed the new feature to staging", time: "2:00 PM", isMe: false },
    { id: 2, sender: "Alex Kim", initials: "AK", content: "Nice! Running tests now", time: "2:05 PM", isMe: false },
    { id: 3, sender: "You", initials: "JD", content: "Great work team! 🚀", time: "2:10 PM", isMe: true },
  ],
  design: [
    { id: 1, sender: "Sarah Chen", initials: "SC", content: "New mockups are ready for review", time: "11:00 AM", isMe: false },
  ],
  random: [
    { id: 1, sender: "Mike Johnson", initials: "MJ", content: "Anyone up for lunch? 🍕", time: "12:00 PM", isMe: false },
  ],
};

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: messages.length + 1,
      sender: "You",
      initials: "JD",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
    
    // Simulate typing indicator
    if (!isChannel) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply: Message = {
          id: messages.length + 2,
          sender: chatName,
          initials: chatName.split(" ").map(n => n[0]).join(""),
          content: "Got it, thanks! 👍",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isMe: false,
        };
        setMessages(prev => [...prev, reply]);
      }, 2000);
    }
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
            <div className="flex-1">
              <h1 className="font-semibold text-foreground">
                {isChannel ? `#${chatName}` : chatName}
              </h1>
              {!isChannel && (
                <p className="text-xs text-success">Online</p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isMe ? "flex-row-reverse" : ""}`}
          >
            {!message.isMe && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                  {message.initials}
                </AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[75%] ${message.isMe ? "items-end" : "items-start"}`}>
              {!message.isMe && isChannel && (
                <p className="text-xs text-muted-foreground mb-1 ml-1">{message.sender}</p>
              )}
              <div
                className={`px-4 py-2.5 rounded-2xl ${
                  message.isMe
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border rounded-bl-md"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <p className={`text-xs text-muted-foreground mt-1 ${message.isMe ? "text-right mr-1" : "ml-1"}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3">
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

      {/* Message Input */}
      <div className="sticky bottom-0 bg-card/95 backdrop-blur-lg border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl shrink-0">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
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
    </div>
  );
}
