import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Building2, Power, Clock, Calendar, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface OfficeHistory {
  date: string;
  openTime: string;
  closeTime: string;
  status: "normal" | "override";
  overrideBy?: string;
}

const mockHistory: OfficeHistory[] = [
  { date: "Today", openTime: "9:00 AM", closeTime: "—", status: "normal" },
  { date: "Yesterday", openTime: "9:15 AM", closeTime: "6:30 PM", status: "normal" },
  { date: "Dec 10", openTime: "9:00 AM", closeTime: "5:00 PM", status: "override", overrideBy: "Admin" },
  { date: "Dec 9", openTime: "9:00 AM", closeTime: "6:00 PM", status: "normal" },
  { date: "Dec 8", openTime: "—", closeTime: "—", status: "override", overrideBy: "Holiday" },
  { date: "Dec 7", openTime: "9:30 AM", closeTime: "6:15 PM", status: "normal" },
];

export default function AdminOfficePage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isOverride, setIsOverride] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState("week");

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
            <h1 className="text-xl font-bold text-foreground">Office Controls</h1>
            <p className="text-xs text-muted-foreground">Manage office status</p>
          </div>
        </div>

        {/* Status Card */}
        <Card className="p-6 rounded-3xl border-border mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isOpen ? 'bg-success/10' : 'bg-destructive/10'}`}>
                <Building2 className={`w-8 h-8 ${isOpen ? 'text-success' : 'text-destructive'}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {isOpen ? "Open" : "Closed"}
                </h2>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-success animate-pulse' : 'bg-destructive'}`} />
                  <span className="text-sm text-muted-foreground">
                    {isOpen ? "Accepting visitors" : "Office is closed"}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleToggleStatus}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                isOpen 
                  ? 'bg-success/10 hover:bg-success/20' 
                  : 'bg-destructive/10 hover:bg-destructive/20'
              }`}
            >
              <Power className={`w-6 h-6 ${isOpen ? 'text-success' : 'text-destructive'}`} />
            </button>
          </div>

          {isOverride && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-warning/10 mb-4">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-sm text-warning font-medium">Override active</span>
              <button
                onClick={handleClearOverride}
                className="ml-auto text-xs text-warning underline"
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
        </Card>

        {/* Admin Override Controls */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Admin Override</h2>
        <div className="flex gap-2 mb-6">
          <Button
            onClick={handleForceOpen}
            className="flex-1 h-12 rounded-xl bg-success hover:bg-success/90"
          >
            Force Open
          </Button>
          <Button
            onClick={handleForceClose}
            variant="outline"
            className="flex-1 h-12 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            Force Close
          </Button>
        </div>

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
                <div>
                  <p className="font-medium text-foreground">{entry.date}</p>
                  <p className="text-xs text-muted-foreground">
                    {entry.openTime} - {entry.closeTime}
                  </p>
                </div>
                {entry.status === "override" && (
                  <span className="px-2 py-1 rounded-lg bg-warning/10 text-warning text-xs font-medium">
                    {entry.overrideBy}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
}
