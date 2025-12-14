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
  ArrowLeft, Search, Calendar, ChevronDown, ChevronUp, 
  FileText, Check, X, RotateCcw, Clock, CheckCircle2, AlertCircle
} from "lucide-react";
import { toast } from "sonner";

type ReportStatus = "submitted" | "verified" | "rejected" | "returned";

interface Report {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  date: string;
  summary: string;
  fullReport: string;
  status: ReportStatus;
  submittedAt: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Doe",
    userRole: "Engineer",
    date: "Today",
    summary: "Completed API integration and code review",
    fullReport: "• Completed the REST API integration for the user authentication module\n• Reviewed 3 pull requests from team members\n• Fixed 2 critical bugs in the payment processing flow\n• Attended standup meeting and sprint planning session\n• Started documentation for the new feature release",
    status: "submitted",
    submittedAt: "10:30 AM",
  },
  {
    id: "2",
    userId: "2",
    userName: "Sarah Wilson",
    userRole: "Designer",
    date: "Today",
    summary: "UI/UX design updates for mobile app",
    fullReport: "• Finalized mobile app redesign mockups\n• Created prototype for user testing\n• Updated design system documentation\n• Collaborated with engineering on implementation details",
    status: "submitted",
    submittedAt: "11:15 AM",
  },
  {
    id: "3",
    userId: "3",
    userName: "Mike Chen",
    userRole: "Engineer",
    date: "Today",
    summary: "Database optimization and testing",
    fullReport: "• Optimized database queries for better performance\n• Implemented caching layer\n• Wrote unit tests for new features\n• Fixed memory leak in background service",
    status: "verified",
    submittedAt: "9:45 AM",
  },
  {
    id: "4",
    userId: "4",
    userName: "Emily Davis",
    userRole: "HR Manager",
    date: "Yesterday",
    summary: "Customer support and documentation",
    fullReport: "• Responded to 15 customer tickets\n• Updated FAQ documentation\n• Created tutorial videos for new features\n• Prepared monthly support metrics report",
    status: "verified",
    submittedAt: "5:30 PM",
  },
  {
    id: "5",
    userId: "5",
    userName: "James Brown",
    userRole: "DevOps",
    date: "Yesterday",
    summary: "Infrastructure updates and monitoring",
    fullReport: "• Deployed new monitoring dashboards\n• Updated server configurations\n• Implemented automated backup system\n• Reviewed security audit findings",
    status: "returned",
    submittedAt: "6:00 PM",
  },
  {
    id: "6",
    userId: "6",
    userName: "Lisa Taylor",
    userRole: "Manager",
    date: "Dec 12",
    summary: "Sprint planning and team reviews",
    fullReport: "• Conducted sprint planning session\n• Reviewed team performance metrics\n• Met with stakeholders for project updates\n• Prepared quarterly report",
    status: "rejected",
    submittedAt: "4:45 PM",
  },
];

export default function AdminReportsPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("pending");

  const pendingReports = reports.filter(r => r.status === "submitted");
  const verifiedReports = reports.filter(r => r.status === "verified");
  const allReports = reports;

  const getFilteredReports = () => {
    let filtered = activeTab === "pending" ? pendingReports : 
                   activeTab === "verified" ? verifiedReports : allReports;
    
    if (search) {
      filtered = filtered.filter(report => 
        report.userName.toLowerCase().includes(search.toLowerCase()) ||
        report.summary.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (dateFilter !== "all") {
      filtered = filtered.filter(report => report.date.toLowerCase() === dateFilter.toLowerCase());
    }
    
    if (userFilter !== "all") {
      filtered = filtered.filter(report => report.userId === userFilter);
    }
    
    return filtered;
  };

  const handleVerify = (reportId: string) => {
    setReports(reports.map(r => r.id === reportId ? { ...r, status: "verified" as ReportStatus } : r));
    toast.success("Report verified");
  };

  const handleReject = (reportId: string) => {
    setReports(reports.map(r => r.id === reportId ? { ...r, status: "rejected" as ReportStatus } : r));
    toast.success("Report rejected");
  };

  const handleSendBack = (reportId: string) => {
    setReports(reports.map(r => r.id === reportId ? { ...r, status: "returned" as ReportStatus } : r));
    toast.success("Report sent back for revision");
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case "submitted": return "bg-primary/10 text-primary";
      case "verified": return "bg-success/10 text-success";
      case "rejected": return "bg-destructive/10 text-destructive";
      case "returned": return "bg-warning/10 text-warning";
    }
  };

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case "submitted": return Clock;
      case "verified": return CheckCircle2;
      case "rejected": return X;
      case "returned": return RotateCcw;
    }
  };

  const todayCount = reports.filter(r => r.date === "Today").length;
  const uniqueUsers = [...new Set(reports.map(r => ({ id: r.userId, name: r.userName })))];

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
              <h1 className="text-xl font-bold text-foreground">Reports Review</h1>
              <p className="text-xs text-muted-foreground">{pendingReports.length} pending review</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <Card className="p-2.5 rounded-xl border-border text-center">
              <p className="text-lg font-bold text-foreground">{todayCount}</p>
              <p className="text-[10px] text-muted-foreground">Today</p>
            </Card>
            <Card className="p-2.5 rounded-xl border-border text-center">
              <p className="text-lg font-bold text-foreground">{pendingReports.length}</p>
              <p className="text-[10px] text-muted-foreground">Pending</p>
            </Card>
            <Card className="p-2.5 rounded-xl border-border text-center">
              <p className="text-lg font-bold text-success">{verifiedReports.length}</p>
              <p className="text-[10px] text-muted-foreground">Verified</p>
            </Card>
            <Card className="p-2.5 rounded-xl border-border text-center">
              <p className="text-lg font-bold text-primary">98%</p>
              <p className="text-[10px] text-muted-foreground">Rate</p>
            </Card>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
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
                {pendingReports.length > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-semibold">
                    {pendingReports.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="verified" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
              </TabsTrigger>
              <TabsTrigger value="all" className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                All
              </TabsTrigger>
            </TabsList>

            {/* Filters */}
            <div className="flex gap-2 pb-3">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="flex-1 h-9 rounded-lg bg-secondary border-0 text-xs">
                  <Calendar className="w-3.5 h-3.5 mr-2" />
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                </SelectContent>
              </Select>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger className="flex-1 h-9 rounded-lg bg-secondary border-0 text-xs">
                  <SelectValue placeholder="User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {uniqueUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="pending" className="mt-0 px-4 pt-4 pb-6">
            <ReportsList 
              reports={getFilteredReports()}
              expandedReport={expandedReport}
              setExpandedReport={setExpandedReport}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              onVerify={handleVerify}
              onReject={handleReject}
              onSendBack={handleSendBack}
              showActions
            />
          </TabsContent>

          <TabsContent value="verified" className="mt-0 px-4 pt-4 pb-6">
            <ReportsList 
              reports={getFilteredReports()}
              expandedReport={expandedReport}
              setExpandedReport={setExpandedReport}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          </TabsContent>

          <TabsContent value="all" className="mt-0 px-4 pt-4 pb-6">
            <ReportsList 
              reports={getFilteredReports()}
              expandedReport={expandedReport}
              setExpandedReport={setExpandedReport}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              onVerify={handleVerify}
              onReject={handleReject}
              onSendBack={handleSendBack}
              showActions
            />
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}

interface ReportsListProps {
  reports: Report[];
  expandedReport: string | null;
  setExpandedReport: (id: string | null) => void;
  getStatusColor: (status: ReportStatus) => string;
  getStatusIcon: (status: ReportStatus) => React.ElementType;
  onVerify?: (id: string) => void;
  onReject?: (id: string) => void;
  onSendBack?: (id: string) => void;
  showActions?: boolean;
}

function ReportsList({ 
  reports, 
  expandedReport, 
  setExpandedReport, 
  getStatusColor, 
  getStatusIcon,
  onVerify,
  onReject,
  onSendBack,
  showActions
}: ReportsListProps) {
  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-foreground font-medium">No reports found</p>
        <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((report) => {
        const StatusIcon = getStatusIcon(report.status);
        const isExpanded = expandedReport === report.id;
        
        return (
          <Card key={report.id} className="rounded-2xl border-border overflow-hidden">
            <button
              onClick={() => setExpandedReport(isExpanded ? null : report.id)}
              className="w-full p-4 text-left"
            >
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    {report.userName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{report.userName}</h3>
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                        {report.userRole}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{report.submittedAt}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{report.summary}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 ${getStatusColor(report.status)}`}>
                      <StatusIcon className="w-3 h-3" />
                      {report.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{report.date}</span>
                  </div>
                </div>
              </div>
            </button>
            
            {isExpanded && (
              <div className="px-4 pb-4 pt-0">
                <div className="p-4 rounded-xl bg-secondary/50 mb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Full Report</span>
                  </div>
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">
                    {report.fullReport}
                  </pre>
                </div>
                
                {showActions && report.status === "submitted" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => onVerify?.(report.id)}
                      className="flex-1 h-10 rounded-xl bg-success hover:bg-success/90 gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Verify
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSendBack?.(report.id)}
                      className="flex-1 h-10 rounded-xl border-warning/30 text-warning hover:bg-warning/10 gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Send Back
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onReject?.(report.id)}
                      className="h-10 px-4 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
