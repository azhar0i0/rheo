import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowLeft, Building2, Power, Clock, Calendar, 
  AlertTriangle, Shield, Zap, History, UserCheck
} from "lucide-react";
import { toast } from "sonner";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from "recharts";
import { AdminAttendanceView } from "@/components/attendance/AdminAttendanceView";

interface OfficeHistory {
  date: string;
  openTime: string;
  closeTime: string;
  status: "normal" | "override";
  overrideBy?: string;
  duration: string;
}

const mockHistory: OfficeHistory[] = [
  { date: "Today", openTime: "9:00 AM", closeTime: "—", status: "normal", duration: "8h+" },
  { date: "Yesterday", openTime: "9:15 AM", closeTime: "6:30 PM", status: "normal", duration: "9h 15m" },
  { date: "Dec 12", openTime: "9:00 AM", closeTime: "5:00 PM", status: "override", overrideBy: "Admin", duration: "8h" },
  { date: "Dec 11", openTime: "9:00 AM", closeTime: "6:00 PM", status: "normal", duration: "9h" },
  { date: "Dec 10", openTime: "—", closeTime: "—", status: "override", overrideBy: "Holiday", duration: "—" },
  { date: "Dec 9", openTime: "9:30 AM", closeTime: "6:15 PM", status: "normal", duration: "8h 45m" },
];

const weeklyData = [
  { day: "Mon", hours: 9.5, visitors: 120 },
  { day: "Tue", hours: 9.0, visitors: 145 },
  { day: "Wed", hours: 9.25, visitors: 132 },
  { day: "Thu", hours: 8.0, visitors: 98 },
  { day: "Fri", hours: 8.5, visitors: 156 },
  { day: "Sat", hours: 0, visitors: 12 },
  { day: "Sun", hours: 0, visitors: 5 },
];

const activityData = [
  { time: "9AM", activity: 25 },
  { time: "10AM", activity: 55 },
  { time: "11AM", activity: 85 },
  { time: "12PM", activity: 70 },
  { time: "1PM", activity: 45 },
  { time: "2PM", activity: 80 },
  { time: "3PM", activity: 95 },
  { time: "4PM", activity: 88 },
  { time: "5PM", activity: 65 },
  { time: "6PM", activity: 35 },
];

export default function AdminOfficePage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isOverride, setIsOverride] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState("week");
  const [activeTab, setActiveTab] = useState("controls");

  const handleToggleStatus = () => {
    setIsOpen(!isOpen);
    toast.success(`Office ${!isOpen ? 'opened' : 'closed'}`);
  };

  const handleForceOpen = () => {
    setIsOpen(true);
    setIsOverride(true);
    toast.success("Office force opened by admin");
  };

  const handleForceClose = () => {
    setIsOpen(false);
    setIsOverride(true);
    toast.success("Office force closed by admin");
  };

  const handleClearOverride = () => {
    setIsOverride(false);
    toast.success("Override cleared, returning to normal schedule");
  };

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="px-4 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin")}
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Office Controls</h1>
              <p className="text-xs text-muted-foreground">Admin only access</p>
            </div>
            <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 ${isOpen ? 'bg-success/10' : 'bg-destructive/10'}`}>
              <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-success animate-pulse' : 'bg-destructive'}`} />
              <span className={`text-xs font-medium ${isOpen ? 'text-success' : 'text-destructive'}`}>
                {isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-12 mb-4 p-1 rounded-2xl bg-secondary/80">
            <TabsTrigger value="controls" className="flex-1 h-full rounded-xl gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm text-xs">
              <Building2 className="w-4 h-4" />
              Office
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex-1 h-full rounded-xl gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm text-xs">
              <UserCheck className="w-4 h-4" />
              Attendance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="controls" className="mt-0">
            {/* Main Status Card */}
            <Card className="p-6 rounded-3xl border-border mb-4 overflow-hidden relative">
              {/* Background gradient */}
              <div className={`absolute inset-0 opacity-5 ${isOpen ? 'bg-success' : 'bg-destructive'}`} />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isOpen ? 'bg-success/10' : 'bg-destructive/10'}`}>
                      <Building2 className={`w-8 h-8 ${isOpen ? 'text-success' : 'text-destructive'}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {isOpen ? "Office Open" : "Office Closed"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {isOpen ? "Accepting visitors" : "Not accepting visitors"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Toggle Switch */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50 mb-4">
                  <div className="flex items-center gap-3">
                    <Power className={`w-5 h-5 ${isOpen ? 'text-success' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="font-medium text-foreground">Office Status</p>
                      <p className="text-xs text-muted-foreground">Toggle to open or close</p>
                    </div>
                  </div>
                  <Switch
                    checked={isOpen}
                    onCheckedChange={handleToggleStatus}
                    className="data-[state=checked]:bg-success"
                  />
                </div>

                {isOverride && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-warning/10 mb-4">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-sm text-warning font-medium flex-1">Override mode active</span>
                    <button
                      onClick={handleClearOverride}
                      className="text-xs text-warning underline font-medium"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-foreground">
                      {isOpen ? "Opened at 9:00 AM" : "Closed at 6:00 PM"}
                    </p>
                    <p className="text-xs text-muted-foreground">Regular hours: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Admin Override Controls */}
            <Card className="p-4 rounded-2xl border-border mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Admin Override</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Force office status regardless of schedule</p>
              <div className="flex gap-2">
                <Button
                  onClick={handleForceOpen}
                  className="flex-1 h-12 rounded-xl bg-success hover:bg-success/90 gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Force Open
                </Button>
                <Button
                  onClick={handleForceClose}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 gap-2"
                >
                  <Power className="w-4 h-4" />
                  Force Close
                </Button>
              </div>
            </Card>

            {/* Activity Graph */}
            <Card className="p-4 rounded-2xl border-border mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground">Today's Activity</h3>
                </div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
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
                      <linearGradient id="colorOfficeActivity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="activity" 
                      stroke="hsl(var(--accent))" 
                      fill="url(#colorOfficeActivity)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Weekly Hours Chart */}
            <Card className="p-4 rounded-2xl border-border mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Weekly Hours</h3>
                </div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
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
                      formatter={(value: number) => [`${value}h`, 'Hours']}
                    />
                    <Bar 
                      dataKey="hours" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* History */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">History</h2>
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-28 h-8 rounded-lg text-xs bg-secondary border-0">
                  <Calendar className="w-3 h-3 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="rounded-2xl border-border overflow-hidden">
              <div className="divide-y divide-border">
                {mockHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        entry.status === "override" ? 'bg-warning/10' : 'bg-secondary'
                      }`}>
                        <Clock className={`w-5 h-5 ${
                          entry.status === "override" ? 'text-warning' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{entry.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {entry.openTime} - {entry.closeTime}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{entry.duration}</p>
                      {entry.status === "override" && (
                        <span className="text-[10px] text-warning font-medium">
                          {entry.overrideBy}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="mt-0">
            <AdminAttendanceView />
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
