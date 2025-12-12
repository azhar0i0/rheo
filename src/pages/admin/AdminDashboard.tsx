import { MobileLayout } from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Users, Clock, MessageSquare, FileText, ChevronRight, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statsCards = [
  { label: "Total Users", value: "156", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { label: "Pending Approvals", value: "8", icon: Clock, color: "text-warning", bg: "bg-warning/10" },
  { label: "Active Channels", value: "12", icon: MessageSquare, color: "text-accent", bg: "bg-accent/10" },
  { label: "Reports Today", value: "47", icon: FileText, color: "text-success", bg: "bg-success/10" },
];

const quickActions = [
  { label: "User Approvals", description: "8 pending requests", path: "/admin/users", icon: Users },
  { label: "Manage Channels", description: "12 active channels", path: "/admin/channels", icon: MessageSquare },
  { label: "View Reports", description: "47 submitted today", path: "/admin/reports", icon: FileText },
  { label: "Office Controls", description: "Currently Open", path: "/admin/office", icon: Settings },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <MobileLayout showNav={false}>
      <div className="px-4 pt-6 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Manage your workspace</p>
          </div>
          <button 
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {statsCards.map((stat) => (
            <Card key={stat.label} className="p-4 rounded-2xl border-border">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Quick Actions</h2>
        <div className="space-y-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Back to App */}
        <button
          onClick={() => navigate("/chats")}
          className="w-full mt-6 p-4 rounded-2xl border border-dashed border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors text-center"
        >
          ← Back to App
        </button>
      </div>
    </MobileLayout>
  );
}
