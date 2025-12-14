import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Clock, MessageSquare, FileText, TrendingUp, 
  Building2, ChevronRight, BarChart3, Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts";

const statsCards = [
  { label: "Pending Users", value: "8", icon: Clock, color: "text-warning", bg: "bg-warning/10", trend: "+3 today" },
  { label: "Reports Today", value: "47", icon: FileText, color: "text-primary", bg: "bg-primary/10", trend: "92% rate" },
  { label: "Total Channels", value: "12", icon: MessageSquare, color: "text-accent", bg: "bg-accent/10", trend: "+2 new" },
  { label: "Total Employees", value: "156", icon: Users, color: "text-success", bg: "bg-success/10", trend: "Active" },
];

const reportsData = [
  { day: "Mon", reports: 42 },
  { day: "Tue", reports: 38 },
  { day: "Wed", reports: 45 },
  { day: "Thu", reports: 47 },
  { day: "Fri", reports: 44 },
  { day: "Sat", reports: 12 },
  { day: "Sun", reports: 8 },
];

const officeActivityData = [
  { time: "9AM", activity: 20 },
  { time: "10AM", activity: 45 },
  { time: "11AM", activity: 80 },
  { time: "12PM", activity: 65 },
  { time: "1PM", activity: 40 },
  { time: "2PM", activity: 75 },
  { time: "3PM", activity: 90 },
  { time: "4PM", activity: 85 },
  { time: "5PM", activity: 60 },
  { time: "6PM", activity: 30 },
];

const quickActions = [
  { label: "User Approvals", description: "8 pending requests", path: "/admin/users", icon: Users, badge: "8" },
  { label: "Manage Channels", description: "12 active channels", path: "/admin/channels", icon: MessageSquare },
  { label: "View Reports", description: "47 submitted today", path: "/admin/reports", icon: FileText },
  { label: "Office Controls", description: "Currently Open", path: "/admin/office", icon: Building2, status: "open" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="px-4 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">AD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 pt-4 border-b border-border bg-background sticky top-0 z-10">
            <TabsList className="w-full h-11 bg-secondary/50 rounded-xl p-1">
              <TabsTrigger value="overview" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm">
                Activity
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-0 px-4 pt-4 pb-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {statsCards.map((stat) => (
                <Card key={stat.label} className="p-4 rounded-2xl border-border hover:border-primary/20 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                      {stat.trend}
                    </span>
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
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <action.icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">{action.label}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {action.badge && (
                      <span className="w-6 h-6 rounded-full bg-warning/10 text-warning text-xs font-semibold flex items-center justify-center">
                        {action.badge}
                      </span>
                    )}
                    {action.status === "open" && (
                      <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-medium">
                        Open
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </button>
              ))}
            </div>

            {/* Back to App */}
            <button
              onClick={() => navigate("/chats")}
              className="w-full mt-6 p-4 rounded-2xl border border-dashed border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors text-center font-medium"
            >
              ← Back to App
            </button>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0 px-4 pt-4 pb-6">
            {/* Reports Chart */}
            <Card className="p-4 rounded-2xl border-border mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Daily Reports</h3>
                </div>
                <span className="text-xs text-muted-foreground">This week</span>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportsData}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}
                    />
                    <Bar 
                      dataKey="reports" 
                      fill="hsl(var(--primary))" 
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Office Activity Chart */}
            <Card className="p-4 rounded-2xl border-border mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground">Office Activity</h3>
                </div>
                <span className="text-xs text-muted-foreground">Today</span>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={officeActivityData}>
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}
                    />
                    <defs>
                      <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="activity" 
                      stroke="hsl(var(--accent))" 
                      fill="url(#colorActivity)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-2">
              <Card className="p-3 rounded-xl border-border text-center">
                <p className="text-lg font-bold text-foreground">236</p>
                <p className="text-[10px] text-muted-foreground">Weekly Reports</p>
              </Card>
              <Card className="p-3 rounded-xl border-border text-center">
                <p className="text-lg font-bold text-success">94%</p>
                <p className="text-[10px] text-muted-foreground">Submission Rate</p>
              </Card>
              <Card className="p-3 rounded-xl border-border text-center">
                <p className="text-lg font-bold text-primary">8.5h</p>
                <p className="text-[10px] text-muted-foreground">Avg Hours</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-0 px-4 pt-4 pb-6">
            {/* Recent Activity */}
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: "User approved", user: "Sarah Wilson", role: "Staff", time: "2 min ago", type: "success" },
                { action: "New report submitted", user: "Mike Chen", role: "Engineer", time: "5 min ago", type: "primary" },
                { action: "Channel created", user: "Admin", role: "#marketing", time: "15 min ago", type: "accent" },
                { action: "Office opened", user: "System", role: "Auto", time: "9:00 AM", type: "success" },
                { action: "User pending", user: "James Brown", role: "Awaiting", time: "1 hour ago", type: "warning" },
                { action: "Report verified", user: "Emily Davis", role: "Manager", time: "2 hours ago", type: "success" },
              ].map((activity, index) => (
                <Card key={index} className="p-3 rounded-xl border-border">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === "success" ? "bg-success" :
                      activity.type === "warning" ? "bg-warning" :
                      activity.type === "accent" ? "bg-accent" : "bg-primary"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user} · {activity.role}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
