import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Search, Plus, Users, Hash, Settings, X, UserPlus } from "lucide-react";
import { toast } from "sonner";

interface Channel {
  id: string;
  name: string;
  description: string;
  members: number;
  admins: string[];
  isPrivate: boolean;
}

interface Member {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const mockChannels: Channel[] = [
  { id: "1", name: "general", description: "Company-wide announcements", members: 156, admins: ["John Doe"], isPrivate: false },
  { id: "2", name: "engineering", description: "Engineering team discussions", members: 42, admins: ["Mike Chen"], isPrivate: false },
  { id: "3", name: "design", description: "Design team workspace", members: 18, admins: ["Sarah Wilson"], isPrivate: false },
  { id: "4", name: "management", description: "Management private channel", members: 8, admins: ["Lisa Taylor"], isPrivate: true },
  { id: "5", name: "hr-team", description: "HR discussions", members: 6, admins: ["Emily Davis"], isPrivate: true },
];

const mockMembers: Member[] = [
  { id: "1", name: "John Doe", email: "john@company.com", isAdmin: true },
  { id: "2", name: "Sarah Wilson", email: "sarah@company.com", isAdmin: false },
  { id: "3", name: "Mike Chen", email: "mike@company.com", isAdmin: false },
  { id: "4", name: "Emily Davis", email: "emily@company.com", isAdmin: false },
];

export default function AdminChannelsPage() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>(mockChannels);
  const [search, setSearch] = useState("");
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDesc, setNewChannelDesc] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [memberSearch, setMemberSearch] = useState("");

  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateChannel = () => {
    if (!newChannelName.trim()) {
      toast.error("Channel name is required");
      return;
    }
    const newChannel: Channel = {
      id: Date.now().toString(),
      name: newChannelName.toLowerCase().replace(/\s+/g, "-"),
      description: newChannelDesc,
      members: 1,
      admins: ["You"],
      isPrivate: false,
    };
    setChannels([...channels, newChannel]);
    setNewChannelName("");
    setNewChannelDesc("");
    toast.success("Channel created successfully");
  };

  const handleRemoveMember = (memberId: string) => {
    toast.success("Member removed from channel");
  };

  const handleToggleAdmin = (memberId: string) => {
    toast.success("Admin status updated");
  };

  return (
    <MobileLayout showNav={false}>
      <div className="px-4 pt-6 pb-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/admin")}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Channels</h1>
            <p className="text-xs text-muted-foreground">{channels.length} total channels</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="h-10 px-4 rounded-xl gradient-primary">
                <Plus className="w-4 h-4 mr-1" /> New
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl">
              <DialogHeader>
                <DialogTitle>Create Channel</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Channel Name</label>
                  <Input
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    placeholder="e.g., marketing"
                    className="h-11 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                  <Input
                    value={newChannelDesc}
                    onChange={(e) => setNewChannelDesc(e.target.value)}
                    placeholder="What's this channel about?"
                    className="h-11 rounded-xl"
                  />
                </div>
                <Button
                  onClick={handleCreateChannel}
                  className="w-full h-11 rounded-xl gradient-primary"
                >
                  Create Channel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search channels..."
            className="pl-10 h-11 rounded-xl bg-secondary border-0"
          />
        </div>

        {/* Channels List */}
        <div className="space-y-2">
          {filteredChannels.map((channel) => (
            <Dialog key={channel.id}>
              <DialogTrigger asChild>
                <Card 
                  className="p-4 rounded-2xl border-border hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => setSelectedChannel(channel)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${channel.isPrivate ? 'bg-warning/10' : 'bg-primary/10'}`}>
                      <Hash className={`w-5 h-5 ${channel.isPrivate ? 'text-warning' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">#{channel.name}</h3>
                        {channel.isPrivate && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-warning/10 text-warning">Private</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{channel.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{channel.members}</span>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="rounded-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-primary" />
                    {channel.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="pt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">{channel.description}</p>
                  
                  {/* Add Members */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={memberSearch}
                        onChange={(e) => setMemberSearch(e.target.value)}
                        placeholder="Search to add members..."
                        className="pl-10 h-10 rounded-xl text-sm"
                      />
                    </div>
                    <Button size="sm" className="h-10 px-3 rounded-xl">
                      <UserPlus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Members List */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Members ({channel.members})</h4>
                    <div className="space-y-2">
                      {mockMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {member.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-foreground">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleAdmin(member.id)}
                              className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                                member.isAdmin 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary'
                              }`}
                            >
                              {member.isAdmin ? 'Admin' : 'Make Admin'}
                            </button>
                            <button
                              onClick={() => handleRemoveMember(member.id)}
                              className="w-7 h-7 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 flex items-center justify-center"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
