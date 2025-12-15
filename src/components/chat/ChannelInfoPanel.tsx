import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  X, 
  Users, 
  Pin, 
  Bell, 
  BellOff, 
  Settings, 
  Hash,
  Pencil,
  Check
} from "lucide-react";
import type { Message } from "./MessageBubble";

interface Member {
  id: number;
  name: string;
  initials: string;
  role: "admin" | "member";
  status: "online" | "offline";
}

interface ChannelInfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
  channelName: string;
  channelDescription: string;
  members: Member[];
  pinnedMessages: Message[];
  isMuted: boolean;
  onMute: (duration: string) => void;
  onUnmute: () => void;
  onRenameChannel: (name: string) => void;
  onUpdateDescription: (description: string) => void;
  onGoToPinnedMessage: (messageId: number) => void;
  canManage: boolean;
}

export function ChannelInfoPanel({
  isOpen,
  onClose,
  channelName,
  channelDescription,
  members,
  pinnedMessages,
  isMuted,
  onMute,
  onUnmute,
  onRenameChannel,
  onUpdateDescription,
  onGoToPinnedMessage,
  canManage,
}: ChannelInfoPanelProps) {
  const [editingName, setEditingName] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [newName, setNewName] = useState(channelName);
  const [newDesc, setNewDesc] = useState(channelDescription);
  const [showMuteDialog, setShowMuteDialog] = useState(false);

  const handleSaveName = () => {
    if (newName.trim()) {
      onRenameChannel(newName.trim());
      setEditingName(false);
    }
  };

  const handleSaveDesc = () => {
    onUpdateDescription(newDesc.trim());
    setEditingDesc(false);
  };

  const muteOptions = [
    { label: "15 minutes", value: "15m" },
    { label: "1 hour", value: "1h" },
    { label: "8 hours", value: "8h" },
    { label: "24 hours", value: "24h" },
    { label: "Until I turn it back on", value: "forever" },
  ];

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-md p-0">
          <SheetHeader className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-primary" />
                {editingName && canManage ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="h-8 w-40"
                      autoFocus
                    />
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleSaveName}>
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    {channelName}
                    {canManage && (
                      <button onClick={() => setEditingName(true)} className="opacity-50 hover:opacity-100">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </span>
                )}
              </SheetTitle>
            </div>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-80px)]">
            <div className="p-4 space-y-6">
              {/* Channel Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">Description</h3>
                  {canManage && !editingDesc && (
                    <button onClick={() => setEditingDesc(true)} className="text-muted-foreground hover:text-foreground">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {editingDesc && canManage ? (
                  <div className="space-y-2">
                    <Textarea
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveDesc}>Save</Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingDesc(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {channelDescription || "No description"}
                  </p>
                )}
              </div>

              {/* Mute Settings */}
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-3">
                  {isMuted ? (
                    <BellOff className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Bell className="w-5 h-5 text-primary" />
                  )}
                  <div>
                    <p className="text-sm font-medium">Notifications</p>
                    <p className="text-xs text-muted-foreground">
                      {isMuted ? "Muted" : "All messages"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => isMuted ? onUnmute() : setShowMuteDialog(true)}
                >
                  {isMuted ? "Unmute" : "Mute"}
                </Button>
              </div>

              {/* Pinned Messages */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Pin className="w-4 h-4 text-warning" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Pinned Messages ({pinnedMessages.length})
                  </h3>
                </div>
                {pinnedMessages.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No pinned messages</p>
                ) : (
                  <div className="space-y-2">
                    {pinnedMessages.map((msg) => (
                      <button
                        key={msg.id}
                        onClick={() => onGoToPinnedMessage(msg.id)}
                        className="w-full text-left p-3 bg-card border border-border rounded-xl hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-foreground">{msg.sender}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{msg.content}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Members */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Members ({members.length})
                  </h3>
                </div>
                <div className="space-y-1">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition-colors"
                    >
                      <div className="relative">
                        <Avatar className="w-9 h-9">
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                            member.status === "online" ? "bg-success" : "bg-muted-foreground/50"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        {member.role === "admin" && (
                          <p className="text-xs text-primary">Admin</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Mute Duration Dialog */}
      <Dialog open={showMuteDialog} onOpenChange={setShowMuteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mute Channel</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {muteOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onMute(option.value);
                  setShowMuteDialog(false);
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-secondary transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
