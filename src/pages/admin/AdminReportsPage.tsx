import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Search, Calendar, ChevronDown, ChevronUp, FileText } from "lucide-react";

interface Report {
  id: string;
  userId: string;
  userName: string;
  date: string;
  summary: string;
  fullReport: string;
  status: "submitted" | "reviewed";
}

const mockReports: Report[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Doe",
    date: "Today",
    summary: "Completed API integration and code review",
    fullReport: "• Completed the REST API integration for the user authentication module\n• Reviewed 3 pull requests from team members\n• Fixed 2 critical bugs in the payment processing flow\n• Attended standup meeting and sprint planning session\n• Started documentation for the new feature release",
    status: "submitted",
  },
  {
    id: "2",
    userId: "2",
    userName: "Sarah Wilson",
    date: "Today",
    summary: "UI/UX design updates for mobile app",
    fullReport: "• Finalized mobile app redesign mockups\n• Created prototype for user testing\n• Updated design system documentation\n• Collaborated with engineering on implementation details",
    status: "submitted",
  },
  {
    id: "3",
    userId: "3",
    userName: "Mike Chen",
    date: "Today",
    summary: "Database optimization and testing",
    fullReport: "• Optimized database queries for better performance\n• Implemented caching layer\n• Wrote unit tests for new features\n• Fixed memory leak in background service",
    status: "reviewed",
  },
  {
    id: "4",
    userId: "4",
    userName: "Emily Davis",
    date: "Yesterday",
    summary: "Customer support and documentation",
    fullReport: "• Responded to 15 customer tickets\n• Updated FAQ documentation\n• Created tutorial videos for new features\n• Prepared monthly support metrics report",
    status: "reviewed",
  },
  {
    id: "5",
    userId: "5",
    userName: "James Brown",
    date: "Yesterday",
    summary: "Infrastructure updates and monitoring",
    fullReport: "• Deployed new monitoring dashboards\n• Updated server configurations\n• Implemented automated backup system\n• Reviewed security audit findings",
    status: "reviewed",
  },
];

export default function AdminReportsPage() {
  const navigate = useNavigate();
  const [reports] = useState<Report[]>(mockReports);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.userName.toLowerCase().includes(search.toLowerCase()) ||
      report.summary.toLowerCase().includes(search.toLowerCase());
    const matchesDate = dateFilter === "all" || report.date.toLowerCase().includes(dateFilter.toLowerCase());
    return matchesSearch && matchesDate;
  });

  const todayCount = reports.filter(r => r.date === "Today").length;

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
            <h1 className="text-xl font-bold text-foreground">Reports Overview</h1>
            <p className="text-xs text-muted-foreground">{todayCount} submitted today</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Card className="p-3 rounded-xl border-border text-center">
            <p className="text-xl font-bold text-foreground">{todayCount}</p>
            <p className="text-[10px] text-muted-foreground">Today</p>
          </Card>
          <Card className="p-3 rounded-xl border-border text-center">
            <p className="text-xl font-bold text-foreground">{reports.length}</p>
            <p className="text-[10px] text-muted-foreground">This Week</p>
          </Card>
          <Card className="p-3 rounded-xl border-border text-center">
            <p className="text-xl font-bold text-success">98%</p>
            <p className="text-[10px] text-muted-foreground">Compliance</p>
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="pl-10 h-11 rounded-xl bg-secondary border-0"
            />
          </div>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-32 h-11 rounded-xl bg-secondary border-0">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.map((report) => (
            <Card 
              key={report.id} 
              className="rounded-2xl border-border overflow-hidden"
            >
              <button
                onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                className="w-full p-4 text-left"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {report.userName.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{report.userName}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{report.date}</span>
                        {expandedReport === report.id ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{report.summary}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        report.status === "reviewed" 
                          ? "bg-success/10 text-success" 
                          : "bg-primary/10 text-primary"
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
              
              {expandedReport === report.id && (
                <div className="px-4 pb-4 pt-0">
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Full Report</span>
                    </div>
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                      {report.fullReport}
                    </pre>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
