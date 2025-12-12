import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search, Check, X, Filter } from "lucide-react";
import { toast } from "sonner";

type UserStatus = "pending" | "approved" | "rejected";
type UserRole = "admin" | "manager" | "staff" | "guest";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  status: UserStatus;
  role?: UserRole;
  requestedAt: string;
}

const mockUsers: User[] = [
  { id: "1", name: "Sarah Wilson", email: "sarah@company.com", username: "sarahw", status: "pending", requestedAt: "2 hours ago" },
  { id: "2", name: "Mike Chen", email: "mike@company.com", username: "mikec", status: "pending", requestedAt: "5 hours ago" },
  { id: "3", name: "Emily Davis", email: "emily@company.com", username: "emilyd", status: "pending", requestedAt: "1 day ago" },
  { id: "4", name: "James Brown", email: "james@company.com", username: "jamesb", status: "approved", role: "staff", requestedAt: "2 days ago" },
  { id: "5", name: "Lisa Taylor", email: "lisa@company.com", username: "lisat", status: "approved", role: "manager", requestedAt: "3 days ago" },
  { id: "6", name: "David Lee", email: "david@company.com", username: "davidl", status: "rejected", requestedAt: "4 days ago" },
];

const roles: { value: UserRole; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "staff", label: "Staff" },
  { value: "guest", label: "Guest" },
];

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [selectedRoles, setSelectedRoles] = useState<Record<string, UserRole>>({});

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || user.status === filter;
    return matchesSearch && matchesFilter;
  });

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

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case "pending": return "bg-warning/10 text-warning";
      case "approved": return "bg-success/10 text-success";
      case "rejected": return "bg-destructive/10 text-destructive";
    }
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
          <div>
            <h1 className="text-xl font-bold text-foreground">User Management</h1>
            <p className="text-xs text-muted-foreground">{users.filter(u => u.status === "pending").length} pending approvals</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-10 h-11 rounded-xl bg-secondary border-0"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32 h-11 rounded-xl bg-secondary border-0">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="p-4 rounded-2xl border-border">
              <div className="flex items-start gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  <p className="text-xs text-muted-foreground">@{user.username} · {user.requestedAt}</p>
                  
                  {user.status === "pending" && (
                    <div className="flex items-center gap-2 mt-3">
                      <Select
                        value={selectedRoles[user.id] || ""}
                        onValueChange={(value) => setSelectedRoles({ ...selectedRoles, [user.id]: value as UserRole })}
                      >
                        <SelectTrigger className="h-9 rounded-lg text-xs flex-1">
                          <SelectValue placeholder="Assign role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(user.id)}
                        className="h-9 px-3 rounded-lg bg-success hover:bg-success/90"
                      >
                        <Check className="w-4 h-4" />
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
                  )}
                  
                  {user.status === "approved" && user.role && (
                    <div className="mt-2">
                      <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium capitalize">
                        {user.role}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
