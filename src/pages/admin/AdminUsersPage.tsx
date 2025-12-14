import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  ArrowLeft, Search, Check, X, Filter, Edit2, UserX, 
  Shield, ShieldAlert, ShieldCheck, Clock, Users, UserCheck
} from "lucide-react";
import { toast } from "sonner";

type UserStatus = "pending" | "approved" | "rejected" | "deactivated";
type UserRole = "admin" | "manager" | "senior" | "staff" | "guest";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  status: UserStatus;
  role?: UserRole;
  requestedAt: string;
  department?: string;
}

const mockUsers: User[] = [
  { id: "1", name: "Sarah Wilson", email: "sarah@company.com", username: "sarahw", status: "pending", requestedAt: "2 hours ago", department: "Engineering" },
  { id: "2", name: "Mike Chen", email: "mike@company.com", username: "mikec", status: "pending", requestedAt: "5 hours ago", department: "Design" },
  { id: "3", name: "Emily Davis", email: "emily@company.com", username: "emilyd", status: "pending", requestedAt: "1 day ago", department: "HR" },
  { id: "4", name: "James Brown", email: "james@company.com", username: "jamesb", status: "approved", role: "staff", requestedAt: "2 days ago", department: "Engineering" },
  { id: "5", name: "Lisa Taylor", email: "lisa@company.com", username: "lisat", status: "approved", role: "manager", requestedAt: "3 days ago", department: "Management" },
  { id: "6", name: "David Lee", email: "david@company.com", username: "davidl", status: "approved", role: "senior", requestedAt: "4 days ago", department: "Engineering" },
  { id: "7", name: "Anna Kim", email: "anna@company.com", username: "annak", status: "approved", role: "admin", requestedAt: "1 week ago", department: "Management" },
  { id: "8", name: "Robert Johnson", email: "robert@company.com", username: "robertj", status: "deactivated", role: "staff", requestedAt: "2 weeks ago", department: "Sales" },
];

const roles: { value: UserRole; label: string; icon: React.ElementType }[] = [
  { value: "admin", label: "Admin", icon: ShieldAlert },
  { value: "manager", label: "Manager", icon: ShieldCheck },
  { value: "senior", label: "Senior", icon: Shield },
  { value: "staff", label: "Staff", icon: Users },
  { value: "guest", label: "Guest", icon: Users },
];

const getRoleIcon = (role?: UserRole) => {
  const found = roles.find(r => r.value === role);
  return found?.icon || Users;
};

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedRoles, setSelectedRoles] = useState<Record<string, UserRole>>({});
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const pendingUsers = users.filter(u => u.status === "pending");
  const approvedUsers = users.filter(u => u.status === "approved");
  const allUsers = users;

  const getFilteredUsers = () => {
    let filtered = activeTab === "pending" ? pendingUsers : 
                   activeTab === "approved" ? approvedUsers : allUsers;
    
    if (search) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (roleFilter !== "all" && activeTab !== "pending") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    return filtered;
  };

  const handleApprove = (userId: string) => {
    const role = selectedRoles[userId];
    if (!role) {
      toast.error("Please select a role first");
      return;
    }
    setUsers(users.map(u => u.id === userId ? { ...u, status: "approved" as UserStatus, role } : u));
    toast.success("User approved successfully");
  };

  const handleReject = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: "rejected" as UserStatus } : u));
    toast.success("User rejected");
  };

  const handleChangeRole = (userId: string, newRole: UserRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    setEditingUser(null);
    toast.success("Role updated successfully");
  };

  const handleDeactivate = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: "deactivated" as UserStatus } : u));
    setEditingUser(null);
    toast.success("User deactivated");
  };

  const handleReactivate = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: "approved" as UserStatus } : u));
    toast.success("User reactivated");
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case "pending": return "bg-warning/10 text-warning";
      case "approved": return "bg-success/10 text-success";
      case "rejected": return "bg-destructive/10 text-destructive";
      case "deactivated": return "bg-muted text-muted-foreground";
    }
  };

  const getRoleColor = (role?: UserRole) => {
    switch (role) {
      case "admin": return "bg-destructive/10 text-destructive";
      case "manager": return "bg-primary/10 text-primary";
      case "senior": return "bg-accent/10 text-accent";
      default: return "bg-secondary text-foreground";
    }
  };

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
              <h1 className="text-xl font-bold text-foreground">User Management</h1>
              <p className="text-xs text-muted-foreground">{pendingUsers.length} pending approvals</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-10 h-11 rounded-xl bg-secondary border-0"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 pt-4 border-b border-border bg-background sticky top-0 z-10">
            <TabsList className="w-full h-11 bg-secondary/50 rounded-xl p-1 mb-3">
              <TabsTrigger value="pending" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Pending
                {pendingUsers.length > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-warning/10 text-warning text-[10px] flex items-center justify-center font-semibold">
                    {pendingUsers.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                Approved
              </TabsTrigger>
              <TabsTrigger value="all" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm gap-1.5">
                <Users className="w-3.5 h-3.5" />
                All Users
              </TabsTrigger>
            </TabsList>

            {/* Role Filter - only for approved/all tabs */}
            {activeTab !== "pending" && (
              <div className="flex gap-2 pb-3">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="h-9 rounded-lg bg-secondary border-0 text-xs">
                    <Filter className="w-3.5 h-3.5 mr-2" />
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <TabsContent value="pending" className="mt-0 px-4 pt-4 pb-6">
            <div className="space-y-3">
              {getFilteredUsers().map((user) => (
                <Card key={user.id} className="p-4 rounded-2xl border-border">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-warning/10 text-warning font-semibold">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      <p className="text-xs text-muted-foreground">@{user.username} · {user.requestedAt}</p>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Select
                          value={selectedRoles[user.id] || ""}
                          onValueChange={(value) => setSelectedRoles({ ...selectedRoles, [user.id]: value as UserRole })}
                        >
                          <SelectTrigger className="h-9 rounded-lg text-xs flex-1 bg-secondary border-0">
                            <SelectValue placeholder="Assign role..." />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                <div className="flex items-center gap-2">
                                  <role.icon className="w-3.5 h-3.5" />
                                  {role.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(user.id)}
                          className="h-9 px-4 rounded-lg bg-success hover:bg-success/90 gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(user.id)}
                          className="h-9 px-3 rounded-lg border-destructive/30 text-destructive hover:bg-destructive/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              {getFilteredUsers().length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-success" />
                  </div>
                  <p className="text-foreground font-medium">All caught up!</p>
                  <p className="text-sm text-muted-foreground">No pending approvals</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-0 px-4 pt-4 pb-6">
            <div className="space-y-3">
              {getFilteredUsers().map((user) => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  getRoleColor={getRoleColor}
                  getRoleIcon={getRoleIcon}
                  onEdit={setEditingUser}
                  onDeactivate={handleDeactivate}
                  onChangeRole={handleChangeRole}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-0 px-4 pt-4 pb-6">
            <div className="space-y-3">
              {getFilteredUsers().map((user) => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  getStatusColor={getStatusColor}
                  getRoleColor={getRoleColor}
                  getRoleIcon={getRoleIcon}
                  onEdit={setEditingUser}
                  onDeactivate={handleDeactivate}
                  onReactivate={handleReactivate}
                  onChangeRole={handleChangeRole}
                  showStatus
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}

interface UserCardProps {
  user: User;
  getStatusColor?: (status: UserStatus) => string;
  getRoleColor: (role?: UserRole) => string;
  getRoleIcon: (role?: UserRole) => React.ElementType;
  onEdit: (user: User) => void;
  onDeactivate: (userId: string) => void;
  onReactivate?: (userId: string) => void;
  onChangeRole: (userId: string, role: UserRole) => void;
  showStatus?: boolean;
}

function UserCard({ user, getStatusColor, getRoleColor, getRoleIcon, onDeactivate, onReactivate, onChangeRole, showStatus }: UserCardProps) {
  const RoleIcon = getRoleIcon(user.role);
  const [editRole, setEditRole] = useState<UserRole | undefined>(user.role);

  return (
    <Card className="p-4 rounded-2xl border-border">
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12">
          <AvatarFallback className={`${user.status === "deactivated" ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"} font-semibold`}>
            {user.name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold truncate ${user.status === "deactivated" ? "text-muted-foreground" : "text-foreground"}`}>
              {user.name}
            </h3>
            {showStatus && getStatusColor && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(user.status)}`}>
                {user.status}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          <p className="text-xs text-muted-foreground">@{user.username} · {user.department}</p>
          
          <div className="flex items-center gap-2 mt-3">
            {user.role && user.status !== "deactivated" && (
              <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 ${getRoleColor(user.role)}`}>
                <RoleIcon className="w-3 h-3" />
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            )}
            
            {user.status === "deactivated" ? (
              onReactivate && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReactivate(user.id)}
                  className="h-8 px-3 rounded-lg text-xs ml-auto"
                >
                  Reactivate
                </Button>
              )
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2 rounded-lg text-xs ml-auto text-muted-foreground"
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl">
                  <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                  </DialogHeader>
                  <div className="pt-4 space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Change Role</label>
                      <Select value={editRole} onValueChange={(v) => setEditRole(v as UserRole)}>
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              <div className="flex items-center gap-2">
                                <role.icon className="w-4 h-4" />
                                {role.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={() => editRole && onChangeRole(user.id, editRole)}
                      className="w-full h-11 rounded-xl gradient-primary"
                    >
                      Save Changes
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => onDeactivate(user.id)}
                      className="w-full h-11 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
                    >
                      <UserX className="w-4 h-4 mr-2" />
                      Deactivate User
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
