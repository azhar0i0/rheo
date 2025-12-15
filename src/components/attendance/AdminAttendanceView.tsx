import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Calendar, CheckCircle2, XCircle, MinusCircle, Download, Filter, ChevronLeft, ChevronRight } from "lucide-react";

interface UserAttendance {
  id: number;
  name: string;
  initials: string;
  role: string;
  status: "present" | "absent" | "leave";
  checkIn?: string;
  checkOut?: string;
  duration?: string;
}

const mockUserAttendance: UserAttendance[] = [
  { id: 1, name: "Sarah Chen", initials: "SC", role: "Manager", status: "present", checkIn: "9:00 AM", checkOut: "6:00 PM", duration: "9h" },
  { id: 2, name: "Mike Johnson", initials: "MJ", role: "Developer", status: "present", checkIn: "9:15 AM", duration: "7h 45m" },
  { id: 3, name: "Emily Davis", initials: "ED", role: "Designer", status: "leave" },
  { id: 4, name: "Alex Kim", initials: "AK", role: "Developer", status: "present", checkIn: "8:45 AM", checkOut: "5:30 PM", duration: "8h 45m" },
  { id: 5, name: "Jordan Lee", initials: "JL", role: "QA", status: "absent" },
  { id: 6, name: "Taylor Swift", initials: "TS", role: "Marketing", status: "present", checkIn: "9:30 AM", duration: "7h 30m" },
  { id: 7, name: "Chris Brown", initials: "CB", role: "Developer", status: "present", checkIn: "9:00 AM", checkOut: "6:15 PM", duration: "9h 15m" },
  { id: 8, name: "Dana White", initials: "DW", role: "HR", status: "leave" },
];

export function AdminAttendanceView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const filteredUsers = mockUserAttendance.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    present: mockUserAttendance.filter(u => u.status === "present").length,
    leave: mockUserAttendance.filter(u => u.status === "leave").length,
    absent: mockUserAttendance.filter(u => u.status === "absent").length,
    total: mockUserAttendance.length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "absent": return <XCircle className="w-4 h-4 text-destructive" />;
      case "leave": return <MinusCircle className="w-4 h-4 text-warning" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present": return "bg-success/10 text-success";
      case "absent": return "bg-destructive/10 text-destructive";
      case "leave": return "bg-warning/10 text-warning";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-2">
        <Card className="p-3 rounded-xl border-border text-center">
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          <p className="text-[10px] text-muted-foreground uppercase">Total</p>
        </Card>
        <Card className="p-3 rounded-xl border-border text-center bg-success/5">
          <p className="text-2xl font-bold text-success">{stats.present}</p>
          <p className="text-[10px] text-muted-foreground uppercase">Present</p>
        </Card>
        <Card className="p-3 rounded-xl border-border text-center bg-warning/5">
          <p className="text-2xl font-bold text-warning">{stats.leave}</p>
          <p className="text-[10px] text-muted-foreground uppercase">Leave</p>
        </Card>
        <Card className="p-3 rounded-xl border-border text-center bg-destructive/5">
          <p className="text-2xl font-bold text-destructive">{stats.absent}</p>
          <p className="text-[10px] text-muted-foreground uppercase">Absent</p>
        </Card>
      </div>

      {/* Date Navigation */}
      <Card className="p-3 rounded-xl border-border">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent border-0 text-sm font-medium text-foreground outline-none"
            />
          </div>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Search & Filters */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-secondary border-0"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-28 h-10 rounded-xl bg-secondary border-0">
            <Filter className="w-4 h-4 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="leave">Leave</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {/* User List */}
      <Card className="rounded-2xl border-border overflow-hidden">
        <div className="divide-y divide-border">
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3 p-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground text-sm">{user.name}</p>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium uppercase ${getStatusBadge(user.status)}`}>
                    {user.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
              <div className="text-right">
                {user.checkIn && (
                  <p className="text-xs text-muted-foreground">
                    {user.checkIn} - {user.checkOut || "—"}
                  </p>
                )}
                {user.duration && (
                  <p className="text-sm font-semibold text-foreground">{user.duration}</p>
                )}
              </div>
              {getStatusIcon(user.status)}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
