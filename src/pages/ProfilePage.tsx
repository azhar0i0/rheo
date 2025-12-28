import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { RoleBadge } from "@/components/RoleBadge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
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
import { Edit3, Camera, Shield, LogOut, ChevronRight, Moon, Settings } from "lucide-react";
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

  return (
    <MobileLayout>
      <PageHeader title="Profile" showNotifications={false} />

      <div className="px-4 pt-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg press-scale">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
          <h2 className="text-xl font-semibold text-foreground">John Doe</h2>
          <p className="text-muted-foreground mb-3">@{username}</p>
          <RoleBadge role="Employee" />
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <h3 className="section-header">Account</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Change Username */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full list-row border-b border-border/50">
                  <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center">
                    <Edit3 className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="flex-1 text-left font-medium">Change Username</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </DialogTrigger>
              <DialogContent className="mx-4 rounded-xl">
                <DialogHeader>
                  <DialogTitle>Change Username</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11 rounded-lg"
                    placeholder="New username"
                  />
                  <Button onClick={handleUsernameChange} className="w-full h-11 rounded-lg">
                    Update
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            {/* Update Profile Image */}
            <button className="w-full list-row border-b border-border/50">
              <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center">
                <Camera className="w-4 h-4 text-foreground" />
              </div>
              <span className="flex-1 text-left font-medium">Update Photo</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            {/* Request Role */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full list-row">
                  <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="flex-1 text-left font-medium">Request Role Change</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </DialogTrigger>
              <DialogContent className="mx-4 rounded-xl">
                <DialogHeader>
                  <DialogTitle>Request Role Change</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    Current: <span className="font-medium text-foreground">Employee</span>
                  </p>
                  <Textarea
                    value={roleReason}
                    onChange={(e) => setRoleReason(e.target.value)}
                    className="min-h-24 rounded-lg resize-none"
                    placeholder="Why are you requesting this change?"
                  />
                  <Button
                    onClick={handleRoleRequest}
                    disabled={!roleReason.trim()}
                    className="w-full h-11 rounded-lg"
                  >
                    Submit Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mb-6">
          <h3 className="section-header">Preferences</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Dark Mode */}
            <div className="list-row border-b border-border/50">
              <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center">
                <Moon className="w-4 h-4 text-foreground" />
              </div>
              <span className="flex-1 font-medium">Dark Mode</span>
              <ThemeToggle />
            </div>

            {/* Admin Panel */}
            <button 
              onClick={() => navigate("/admin")}
              className="w-full list-row"
            >
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <span className="font-medium text-primary">Admin Panel</span>
              </div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full mr-2">
                Admin
              </span>
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
        
        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full h-12 rounded-xl text-destructive hover:bg-destructive/10 font-medium"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground/60 mt-6 mb-4">
          Rheo v1.0.0
        </p>
      </div>
    </MobileLayout>
  );
}
