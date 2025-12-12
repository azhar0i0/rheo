import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Send, CheckCircle2, Clock, Calendar } from "lucide-react";
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

  return (
    <MobileLayout>
      <div className="px-4 pt-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Daily Reports</h1>
        
        <Card className="p-6 rounded-3xl border-border shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Today's Report</h2>
                <p className="text-sm text-muted-foreground">Dec 12, 2024</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
              todaySubmitted
                ? "bg-success/10 text-success"
                : "bg-warning/10 text-warning"
            }`}>
              {todaySubmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Submitted
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
                placeholder="What did you work on today?"
                value={report}
                onChange={(e) => setReport(e.target.value)}
                className="min-h-32 rounded-2xl bg-secondary/50 border-0 resize-none mb-4"
              />
              <Button
                onClick={handleSubmit}
                disabled={!report.trim()}
                className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </>
          ) : (
            <div className="bg-success/5 rounded-2xl p-4 border border-success/20">
              <p className="text-sm text-foreground">
                Your report for today has been submitted. Great job staying on track!
              </p>
            </div>
          )}
        </Card>
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Past Reports</h3>
          </div>
          
          <div className="space-y-3">
            {pastReports.map((item) => (
              <Card
                key={item.id}
                className="p-4 rounded-2xl border-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{item.date}</span>
                  <span className="flex items-center gap-1 text-xs text-success">
                    <CheckCircle2 className="w-3 h-3" />
                    Submitted
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
