import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { RoleBadge } from "@/components/RoleBadge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit3, Camera, Shield, LogOut, ChevronRight, Palette, Settings, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("john.doe");
  const [roleReason, setRoleReason] = useState("");
  
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleUsernameChange = () => {
    toast.success("Username updated!");
  };

  const handleRoleRequest = () => {
    if (roleReason.trim()) {
      toast.success("Role change request submitted!");
      setRoleReason("");
    }
  };

  const menuItems = [
    {
      id: "username",
      icon: Edit3,
      label: "Change Username",
      dialog: true,
    },
    {
      id: "image",
      icon: Camera,
      label: "Update Profile Image",
      dialog: false,
    },
    {
      id: "role",
      icon: Shield,
      label: "Request New Role",
      dialog: true,
    },
  ];

  return (
    <MobileLayout>
      {/* Header with Notifications */}
      <PageHeader title="Profile" />

      <div className="px-4 pt-4 pb-6">
        {/* Profile Card */}
        <Card className="p-6 rounded-3xl border-border/50 shadow-xl bg-gradient-to-br from-card to-card/80 mb-6">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <Avatar className="w-28 h-28 ring-4 ring-primary/20 shadow-xl">
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-foreground text-3xl font-bold">
                  JD
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-1 right-1 w-9 h-9 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                <Camera className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-1">John Doe</h2>
            <p className="text-muted-foreground mb-4">@{username}</p>
            <RoleBadge role="Employee" />
          </div>
          
          {/* Menu Items */}
          <div className="space-y-2">
            {/* Change Username */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-200 group">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-card rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <Edit3 className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="font-medium text-foreground">Change Username</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                </button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl">
                <DialogHeader>
                  <DialogTitle>Change Username</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 rounded-xl"
                    placeholder="New username"
                  />
                  <Button
                    onClick={handleUsernameChange}
                    className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold"
                  >
                    Update Username
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            {/* Update Profile Image */}
            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-200 group">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-card rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <Camera className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-medium text-foreground">Update Profile Image</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </button>
            
            {/* Request New Role */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-200 group">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-card rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <Shield className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="font-medium text-foreground">Request New Role</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                </button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl">
                <DialogHeader>
                  <DialogTitle>Request Role Change</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    Current role: <span className="font-semibold text-foreground">Employee</span>
                  </p>
                  <Textarea
                    value={roleReason}
                    onChange={(e) => setRoleReason(e.target.value)}
                    className="min-h-24 rounded-xl resize-none"
                    placeholder="Explain why you're requesting a role change..."
                  />
                  <Button
                    onClick={handleRoleRequest}
                    disabled={!roleReason.trim()}
                    className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold"
                  >
                    Submit Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        {/* Settings Card */}
        <Card className="p-2 rounded-2xl border-border/50 mb-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-medium text-foreground">Dark Mode</span>
            </div>
            <ThemeToggle />
          </div>

          {/* Admin Panel Link */}
          <button 
            onClick={() => navigate("/admin")}
            className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-primary/5 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <span className="font-medium text-primary block">Admin Panel</span>
                <span className="text-xs text-muted-foreground">Manage users, channels & more</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded-full">
                ADMIN
              </span>
              <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </Card>
        
        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full h-14 rounded-2xl text-destructive hover:bg-destructive/10 hover:text-destructive font-semibold transition-all"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>

        {/* App Version */}
        <p className="text-center text-[10px] text-muted-foreground/50 mt-6">
          Rheo v1.0.0 · Made with <Sparkles className="w-3 h-3 inline text-primary" /> by your team
        </p>
      </div>
    </MobileLayout>
  );
}
