import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
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
      toast.success("Report submitted!");
      setReport("");
    }
  };

  const streakDays = 5;
  const thisWeekReports = 4;

  return (
    <MobileLayout>
      <PageHeader title="Reports" />

      <div className="px-4 pt-4">
        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{streakDays}</p>
                <p className="text-xs text-muted-foreground">Day streak</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{thisWeekReports}/5</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Today's Report */}
        <div className="bg-card rounded-xl p-5 border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Today's Report</h2>
                <p className="text-sm text-muted-foreground">Dec 12, 2024</p>
              </div>
            </div>
            <span className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              todaySubmitted
                ? "bg-success/10 text-success"
                : "bg-warning/10 text-warning"
            }`}>
              {todaySubmitted ? (
                <><CheckCircle2 className="w-3 h-3" /> Done</>
              ) : (
                <><Clock className="w-3 h-3" /> Pending</>
              )}
            </span>
          </div>
          
          {!todaySubmitted ? (
            <>
              <Textarea
                placeholder="What did you work on today?"
                value={report}
                onChange={(e) => setReport(e.target.value)}
                className="min-h-28 rounded-lg bg-secondary/50 border-0 resize-none mb-4 text-sm"
              />
              <Button
                onClick={handleSubmit}
                disabled={!report.trim()}
                className="w-full h-11 rounded-lg font-medium"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </>
          ) : (
            <div className="bg-success/5 rounded-lg p-4 border border-success/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Report submitted!</p>
                  <p className="text-sm text-muted-foreground">Great job staying on track.</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Past Reports */}
        <section>
          <h3 className="section-header">Past Reports</h3>
          
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {pastReports.map((item, index) => (
              <div
                key={item.id}
                className="px-4 py-3 border-b border-border/50 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground">{item.date}</span>
                  <span className="flex items-center gap-1 text-xs text-success font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Submitted
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}
