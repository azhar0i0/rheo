import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, Search, Plus, Users, Hash, X, UserPlus, 
  Lock, Globe, Filter, Shield, Trash2, Settings
} from "lucide-react";
import { toast } from "sonner";

interface Channel {
  id: string;
  name: string;
  description: string;
  members: number;
  admins: string[];
  isPrivate: boolean;
  createdAt: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  isAdmin: boolean;
}

const mockChannels: Channel[] = [
  { id: "1", name: "general", description: "Company-wide announcements and updates", members: 156, admins: ["John Doe"], isPrivate: false, createdAt: "Dec 1" },
  { id: "2", name: "engineering", description: "Engineering team discussions and code reviews", members: 42, admins: ["Mike Chen"], isPrivate: false, createdAt: "Dec 3" },
  { id: "3", name: "design", description: "Design team workspace for collaboration", members: 18, admins: ["Sarah Wilson"], isPrivate: false, createdAt: "Dec 5" },
  { id: "4", name: "management", description: "Management private discussions", members: 8, admins: ["Lisa Taylor"], isPrivate: true, createdAt: "Dec 2" },
  { id: "5", name: "hr-team", description: "HR team internal communications", members: 6, admins: ["Emily Davis"], isPrivate: true, createdAt: "Dec 4" },
  { id: "6", name: "sales", description: "Sales team updates and strategies", members: 24, admins: ["James Brown"], isPrivate: false, createdAt: "Dec 6" },
];

const mockMembers: Member[] = [
  { id: "1", name: "John Doe", email: "john@company.com", role: "Admin", isAdmin: true },
  { id: "2", name: "Sarah Wilson", email: "sarah@company.com", role: "Designer", isAdmin: false },
  { id: "3", name: "Mike Chen", email: "mike@company.com", role: "Engineer", isAdmin: false },
  { id: "4", name: "Emily Davis", email: "emily@company.com", role: "HR", isAdmin: false },
  { id: "5", name: "Lisa Taylor", email: "lisa@company.com", role: "Manager", isAdmin: false },
];

const allUsers: Member[] = [
  ...mockMembers,
  { id: "6", name: "James Brown", email: "james@company.com", role: "Sales", isAdmin: false },
  { id: "7", name: "Anna Kim", email: "anna@company.com", role: "Marketing", isAdmin: false },
  { id: "8", name: "David Lee", email: "david@company.com", role: "Engineer", isAdmin: false },
];

export default function AdminChannelsPage() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>(mockChannels);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDesc, setNewChannelDesc] = useState("");
  const [newChannelPrivate, setNewChannelPrivate] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [memberSearch, setMemberSearch] = useState("");
  const [channelMembers, setChannelMembers] = useState<Member[]>(mockMembers);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const publicChannels = channels.filter(c => !c.isPrivate);
  const privateChannels = channels.filter(c => c.isPrivate);

  const getFilteredChannels = () => {
    let filtered = activeTab === "public" ? publicChannels : 
                   activeTab === "private" ? privateChannels : channels;
    
    if (search) {
      filtered = filtered.filter(channel =>
        channel.name.toLowerCase().includes(search.toLowerCase()) ||
        channel.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return filtered;
  };

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
      isPrivate: newChannelPrivate,
      createdAt: "Just now",
    };
    setChannels([...channels, newChannel]);
    setNewChannelName("");
    setNewChannelDesc("");
    setNewChannelPrivate(false);
    setCreateDialogOpen(false);
    toast.success("Channel created successfully");
  };

  const handleDeleteChannel = (channelId: string) => {
    setChannels(channels.filter(c => c.id !== channelId));
    setSelectedChannel(null);
    toast.success("Channel deleted");
  };

  const handleRemoveMember = (memberId: string) => {
    setChannelMembers(channelMembers.filter(m => m.id !== memberId));
    toast.success("Member removed from channel");
  };

  const handleToggleAdmin = (memberId: string) => {
    setChannelMembers(channelMembers.map(m => 
      m.id === memberId ? { ...m, isAdmin: !m.isAdmin } : m
    ));
    toast.success("Admin status updated");
  };

  const handleAddMember = (user: Member) => {
    if (channelMembers.find(m => m.id === user.id)) {
      toast.error("User is already a member");
      return;
    }
    setChannelMembers([...channelMembers, user]);
    setMemberSearch("");
    toast.success(`${user.name} added to channel`);
  };

  const searchableUsers = allUsers.filter(u => 
    !channelMembers.find(m => m.id === u.id) &&
    (u.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
     u.email.toLowerCase().includes(memberSearch.toLowerCase()))
  );

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="px-4 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate("/admin")}
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Channels</h1>
              <p className="text-xs text-muted-foreground">{channels.length} total channels</p>
            </div>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-10 px-4 rounded-xl gradient-primary gap-1.5">
                  <Plus className="w-4 h-4" />
                  Create
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl">
                <DialogHeader>
                  <DialogTitle>Create New Channel</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Channel Name</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                        placeholder="e.g., marketing"
                        className="h-11 rounded-xl pl-10"
                      />
                    </div>
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
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Private Channel</p>
                        <p className="text-xs text-muted-foreground">Only invited members can access</p>
                      </div>
                    </div>
                    <Switch
                      checked={newChannelPrivate}
                      onCheckedChange={setNewChannelPrivate}
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search channels..."
              className="pl-10 h-11 rounded-xl bg-secondary border-0"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 pt-4 border-b border-border bg-background sticky top-0 z-10">
            <TabsList className="w-full h-11 bg-secondary/50 rounded-xl p-1">
              <TabsTrigger value="all" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm gap-1.5">
                <Hash className="w-3.5 h-3.5" />
                All ({channels.length})
              </TabsTrigger>
              <TabsTrigger value="public" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Public ({publicChannels.length})
              </TabsTrigger>
              <TabsTrigger value="private" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Private ({privateChannels.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0 px-4 pt-4 pb-6">
            <ChannelsList 
              channels={getFilteredChannels()}
              onSelectChannel={setSelectedChannel}
              channelMembers={channelMembers}
              memberSearch={memberSearch}
              setMemberSearch={setMemberSearch}
              searchableUsers={searchableUsers}
              handleAddMember={handleAddMember}
              handleRemoveMember={handleRemoveMember}
              handleToggleAdmin={handleToggleAdmin}
              handleDeleteChannel={handleDeleteChannel}
            />
          </TabsContent>

          <TabsContent value="public" className="mt-0 px-4 pt-4 pb-6">
            <ChannelsList 
              channels={getFilteredChannels()}
              onSelectChannel={setSelectedChannel}
              channelMembers={channelMembers}
              memberSearch={memberSearch}
              setMemberSearch={setMemberSearch}
              searchableUsers={searchableUsers}
              handleAddMember={handleAddMember}
              handleRemoveMember={handleRemoveMember}
              handleToggleAdmin={handleToggleAdmin}
              handleDeleteChannel={handleDeleteChannel}
            />
          </TabsContent>

          <TabsContent value="private" className="mt-0 px-4 pt-4 pb-6">
            <ChannelsList 
              channels={getFilteredChannels()}
              onSelectChannel={setSelectedChannel}
              channelMembers={channelMembers}
              memberSearch={memberSearch}
              setMemberSearch={setMemberSearch}
              searchableUsers={searchableUsers}
              handleAddMember={handleAddMember}
              handleRemoveMember={handleRemoveMember}
              handleToggleAdmin={handleToggleAdmin}
              handleDeleteChannel={handleDeleteChannel}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}

interface ChannelsListProps {
  channels: Channel[];
  onSelectChannel: (channel: Channel) => void;
  channelMembers: Member[];
  memberSearch: string;
  setMemberSearch: (search: string) => void;
  searchableUsers: Member[];
  handleAddMember: (user: Member) => void;
  handleRemoveMember: (id: string) => void;
  handleToggleAdmin: (id: string) => void;
  handleDeleteChannel: (id: string) => void;
}

function ChannelsList({
  channels,
  channelMembers,
  memberSearch,
  setMemberSearch,
  searchableUsers,
  handleAddMember,
  handleRemoveMember,
  handleToggleAdmin,
  handleDeleteChannel,
}: ChannelsListProps) {
  if (channels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Hash className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-foreground font-medium">No channels found</p>
        <p className="text-sm text-muted-foreground">Create a new channel to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {channels.map((channel) => (
        <Dialog key={channel.id}>
          <DialogTrigger asChild>
            <Card className="p-4 rounded-2xl border-border hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${channel.isPrivate ? 'bg-warning/10' : 'bg-primary/10'}`}>
                  {channel.isPrivate ? (
                    <Lock className="w-5 h-5 text-warning" />
                  ) : (
                    <Hash className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">#{channel.name}</h3>
                    {channel.isPrivate && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-warning/10 text-warning font-medium">Private</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{channel.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">{channel.members}</span>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${channel.isPrivate ? 'bg-warning/10' : 'bg-primary/10'}`}>
                  {channel.isPrivate ? (
                    <Lock className="w-5 h-5 text-warning" />
                  ) : (
                    <Hash className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div>
                  <DialogTitle className="text-left">#{channel.name}</DialogTitle>
                  <p className="text-xs text-muted-foreground">Created {channel.createdAt}</p>
                </div>
              </div>
            </DialogHeader>
            <div className="pt-4 space-y-4">
              <p className="text-sm text-muted-foreground">{channel.description}</p>
              
              {/* Add Members */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Add Members</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    placeholder="Search users to add..."
                    className="pl-10 h-10 rounded-xl text-sm"
                  />
                </div>
                {memberSearch && searchableUsers.length > 0 && (
                  <div className="mt-2 p-2 rounded-xl bg-secondary/50 space-y-1">
                    {searchableUsers.slice(0, 3).map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleAddMember(user)}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="w-7 h-7">
                            <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-left">
                            <p className="text-sm font-medium text-foreground">{user.name}</p>
                            <p className="text-[10px] text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <UserPlus className="w-4 h-4 text-primary" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Members List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">Members ({channelMembers.length})</h4>
                </div>
                <div className="space-y-2">
                  {channelMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9">
                          <AvatarFallback className={`text-xs font-medium ${member.isAdmin ? 'bg-primary/10 text-primary' : 'bg-secondary text-foreground'}`}>
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-foreground">{member.name}</p>
                            {member.isAdmin && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-medium flex items-center gap-0.5">
                                <Shield className="w-2.5 h-2.5" />
                                Admin
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleAdmin(member.id)}
                          className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                            member.isAdmin 
                              ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                              : 'bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary'
                          }`}
                        >
                          {member.isAdmin ? 'Remove Admin' : 'Make Admin'}
                        </button>
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 flex items-center justify-center transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delete Channel */}
              <Button
                variant="outline"
                onClick={() => handleDeleteChannel(channel.id)}
                className="w-full h-11 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Channel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
