import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { RoleBadge } from "@/components/RoleBadge";
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
import { User, Edit3, Camera, Shield, LogOut, ChevronRight } from "lucide-react";
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
      <div className="px-4 pt-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Profile</h1>
        
        <Card className="p-6 rounded-3xl border-border shadow-lg mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-1">John Doe</h2>
            <p className="text-muted-foreground mb-3">@{username}</p>
            <RoleBadge role="Employee" />
          </div>
          
          <div className="space-y-3">
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center">
                      <Edit3 className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="font-medium text-foreground">Change Username</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
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
                    className="w-full h-12 rounded-xl gradient-primary text-primary-foreground"
                  >
                    Update Username
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center">
                  <Camera className="w-5 h-5 text-foreground" />
                </div>
                <span className="font-medium text-foreground">Update Profile Image</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="font-medium text-foreground">Request New Role</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl">
                <DialogHeader>
                  <DialogTitle>Request Role Change</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    Current role: <span className="font-medium text-foreground">Employee</span>
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
                    className="w-full h-12 rounded-xl gradient-primary text-primary-foreground"
                  >
                    Submit Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
        
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full h-14 rounded-2xl text-destructive hover:bg-destructive/10 hover:text-destructive font-medium"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>
    </MobileLayout>
  );
}
