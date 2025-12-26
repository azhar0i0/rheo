import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Send, CheckCircle2, Clock, Calendar, TrendingUp, Target } from "lucide-react";
import { toast } from "sonner";

const pastReports = [
  { id: 1, date: "Dec 11, 2024", summary: "Completed dashboard redesign, fixed 3 bugs", status: "submitted" },
  { id: 2, date: "Dec 10, 2024", summary: "API integration for user module", status: "submitted" },
  { id: 3, date: "Dec 9, 2024", summary: "Team meeting, sprint planning", status: "submitted" },
  { id: 4, date: "Dec 8, 2024", summary: "Code review and documentation", status: "submitted" },
];

export default function ReportsPage() {
  const [report, setReport] = useState("");
  const [todaySubmitted, setTodaySubmitted] = useState(false);

  const handleSubmit = () => {
    if (report.trim()) {
      setTodaySubmitted(true);
      toast.success("Report submitted successfully!");
      setReport("");
    }
  };

  const streakDays = 5;
  const thisWeekReports = 4;

  return (
    <MobileLayout>
      {/* Header with Notifications */}
      <PageHeader title="Daily Reports" />

      <div className="px-4 pt-4 pb-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 rounded-2xl border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{streakDays}</p>
                <p className="text-xs text-muted-foreground">Day streak</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 rounded-2xl border-border/50 bg-gradient-to-br from-accent/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{thisWeekReports}/5</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Today's Report Card */}
        <Card className="p-6 rounded-3xl border-border/50 shadow-xl bg-gradient-to-br from-card to-card/80 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/10">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-foreground">Today's Report</h2>
                <p className="text-sm text-muted-foreground">Dec 12, 2024</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
              todaySubmitted
                ? "bg-success/10 text-success"
                : "bg-warning/10 text-warning"
            }`}>
              {todaySubmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Done
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4" />
                  Pending
                </>
              )}
            </div>
          </div>
          
          {!todaySubmitted ? (
            <>
              <Textarea
                placeholder="What did you work on today? Share your progress, blockers, and plans..."
                value={report}
                onChange={(e) => setReport(e.target.value)}
                className="min-h-36 rounded-2xl bg-secondary/50 border-0 resize-none mb-4 text-[15px] focus:ring-2 focus:ring-primary/20"
              />
              <Button
                onClick={handleSubmit}
                disabled={!report.trim()}
                className="w-full h-13 rounded-2xl gradient-primary text-primary-foreground font-semibold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:shadow-none"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Report
              </Button>
            </>
          ) : (
            <div className="bg-success/5 rounded-2xl p-5 border border-success/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Report submitted!</p>
                  <p className="text-sm text-muted-foreground">
                    Great job staying on track. Keep up the momentum!
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
        
        {/* Past Reports */}
        <section>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Past Reports</h3>
          </div>
          
          <div className="space-y-2.5">
            {pastReports.map((item, index) => (
              <Card
                key={item.id}
                className="p-4 rounded-2xl border-border/50 hover:bg-secondary/30 transition-all duration-200 cursor-pointer group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-semibold text-foreground">{item.date}</span>
                  <span className="flex items-center gap-1.5 text-xs text-success font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Submitted
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground/80 transition-colors">
                  {item.summary}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}
