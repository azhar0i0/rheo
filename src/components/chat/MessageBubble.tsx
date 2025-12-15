import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Reply, 
  Forward, 
  Pin, 
  Pencil, 
  Trash2, 
  Check, 
  CheckCheck,
  Smile
} from "lucide-react";

export interface Message {
  id: number;
  sender: string;
  initials: string;
  content: string;
  time: string;
  date: string;
  isMe: boolean;
  reactions?: { emoji: string; count: number; reacted: boolean }[];
  isPinned?: boolean;
  isEdited?: boolean;
  status?: "sent" | "delivered" | "seen";
  replyTo?: { sender: string; content: string };
  attachments?: { type: "image" | "file"; name: string; url: string }[];
}

interface MessageBubbleProps {
  message: Message;
  isChannel: boolean;
  onReply: (message: Message) => void;
  onEdit: (message: Message) => void;
  onDelete: (messageId: number) => void;
  onPin: (messageId: number) => void;
  onReact: (messageId: number, emoji: string) => void;
  onForward: (message: Message) => void;
}

const quickReactions = ["👍", "❤️", "😂", "😮", "😢", "🎉"];

export function MessageBubble({
  message,
  isChannel,
  onReply,
  onEdit,
  onDelete,
  onPin,
  onReact,
  onForward,
}: MessageBubbleProps) {
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div
      className={`group flex gap-3 ${message.isMe ? "flex-row-reverse" : ""}`}
    >
      {!message.isMe && (
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
            {message.initials}
          </AvatarFallback>
        </Avatar>
      )}
      <div className={`max-w-[75%] ${message.isMe ? "items-end" : "items-start"}`}>
        {/* Reply preview */}
        {message.replyTo && (
          <div className={`flex items-center gap-2 mb-1 ${message.isMe ? "justify-end" : ""}`}>
            <div className="bg-muted/50 px-3 py-1.5 rounded-lg border-l-2 border-primary">
              <p className="text-xs text-muted-foreground">{message.replyTo.sender}</p>
              <p className="text-xs text-foreground/70 truncate max-w-[200px]">{message.replyTo.content}</p>
            </div>
          </div>
        )}
        
        {!message.isMe && isChannel && (
          <p className="text-xs text-muted-foreground mb-1 ml-1 font-medium">{message.sender}</p>
        )}
        
        <div className="relative">
          {/* Message content */}
          <div
            className={`px-4 py-2.5 rounded-2xl relative ${
              message.isMe
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-card border border-border rounded-bl-md"
            } ${message.isPinned ? "ring-2 ring-warning/50" : ""}`}
          >
            {message.isPinned && (
              <Pin className="absolute -top-2 -right-2 w-4 h-4 text-warning fill-warning" />
            )}
            
            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mb-2 space-y-2">
                {message.attachments.map((att, idx) => (
                  <div key={idx}>
                    {att.type === "image" ? (
                      <img 
                        src={att.url} 
                        alt={att.name} 
                        className="rounded-lg max-w-full h-auto"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-background/20 rounded-lg">
                        <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                          📎
                        </div>
                        <span className="text-sm truncate">{att.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            {message.isEdited && (
              <span className={`text-xs ${message.isMe ? "text-primary-foreground/60" : "text-muted-foreground"}`}> (edited)</span>
            )}
          </div>
          
          {/* Quick actions on hover */}
          <div className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity ${message.isMe ? "-left-24" : "-right-24"}`}>
            <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1 shadow-lg">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-7 h-7 rounded-lg"
                onClick={() => setShowReactions(!showReactions)}
              >
                <Smile className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-7 h-7 rounded-lg"
                onClick={() => onReply(message)}
              >
                <Reply className="w-4 h-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={message.isMe ? "end" : "start"} className="w-48">
                  <DropdownMenuItem onClick={() => onReply(message)}>
                    <Reply className="w-4 h-4 mr-2" /> Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onForward(message)}>
                    <Forward className="w-4 h-4 mr-2" /> Forward
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onPin(message.id)}>
                    <Pin className="w-4 h-4 mr-2" /> {message.isPinned ? "Unpin" : "Pin"}
                  </DropdownMenuItem>
                  {message.isMe && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEdit(message)}>
                        <Pencil className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(message.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Quick reactions popup */}
          {showReactions && (
            <div className={`absolute -top-10 ${message.isMe ? "right-0" : "left-0"} bg-card border border-border rounded-full p-1.5 shadow-lg flex gap-1`}>
              {quickReactions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onReact(message.id, emoji);
                    setShowReactions(false);
                  }}
                  className="w-7 h-7 hover:bg-secondary rounded-full flex items-center justify-center transition-colors text-sm"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className={`flex flex-wrap gap-1 mt-1 ${message.isMe ? "justify-end" : ""}`}>
            {message.reactions.map((reaction, idx) => (
              <button
                key={idx}
                onClick={() => onReact(message.id, reaction.emoji)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border transition-colors ${
                  reaction.reacted 
                    ? "bg-primary/10 border-primary/30 text-primary" 
                    : "bg-secondary border-border hover:border-primary/30"
                }`}
              >
                <span>{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </button>
            ))}
          </div>
        )}
        
        {/* Time and status */}
        <div className={`flex items-center gap-1 mt-1 ${message.isMe ? "justify-end mr-1" : "ml-1"}`}>
          <p className="text-xs text-muted-foreground">{message.time}</p>
          {message.isMe && message.status && (
            <span className="text-muted-foreground">
              {message.status === "sent" && <Check className="w-3 h-3" />}
              {message.status === "delivered" && <CheckCheck className="w-3 h-3" />}
              {message.status === "seen" && <CheckCheck className="w-3 h-3 text-primary" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
