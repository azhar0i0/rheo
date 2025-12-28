import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Clock, Calendar, UserCheck, MapPin } from "lucide-react";
import { AttendanceCard } from "@/components/attendance/AttendanceCard";
import { AttendanceCalendar } from "@/components/attendance/AttendanceCalendar";
import { AttendanceHistory } from "@/components/attendance/AttendanceHistory";

const officeHistory = [
  { date: "Today", open: "8:00 AM", close: "6:00 PM", status: "open" },
  { date: "Dec 11", open: "8:30 AM", close: "5:30 PM", status: "closed" },
  { date: "Dec 10", open: "8:00 AM", close: "6:00 PM", status: "closed" },
  { date: "Dec 9", open: "9:00 AM", close: "5:00 PM", status: "closed" },
  { date: "Dec 8", open: "8:00 AM", close: "6:30 PM", status: "closed" },
];

export default function OfficeStatusPage() {
  const [isOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("attendance");

  return (
    <MobileLayout>
      <PageHeader title="Office" />

      <div className="px-4 pt-4">
        {/* Segmented Control */}
        <div className="flex bg-secondary rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab("attendance")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === "attendance" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Attendance
          </button>
          <button
            onClick={() => setActiveTab("office")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === "office" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Office
          </button>
        </div>

        {activeTab === "attendance" && (
          <div className="space-y-6 animate-fade-in">
            <AttendanceCard />

            {/* Calendar Section */}
            <section>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Calendar
              </h3>
              <AttendanceCalendar />
            </section>

            {/* History Section */}
            <section>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Recent
              </h3>
              <AttendanceHistory />
            </section>
          </div>
        )}

        {activeTab === "office" && (
          <div className="space-y-6 animate-fade-in">
            {/* Status Card */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isOpen ? "bg-success/10" : "bg-muted"
                  }`}>
                    <Building2 className={`w-6 h-6 ${isOpen ? "text-success" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {isOpen ? "Open" : "Closed"}
                    </h2>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span className="text-sm">Main HQ</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <span className={`w-3 h-3 rounded-full ${isOpen ? "bg-success" : "bg-muted-foreground"}`} />
                  {isOpen && (
                    <span className="absolute inset-0 w-3 h-3 rounded-full bg-success animate-ping opacity-40" />
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-medium">Opens</span>
                  </div>
                  <span className="text-base font-semibold text-foreground">8:00 AM</span>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-medium">Closes</span>
                  </div>
                  <span className="text-base font-semibold text-foreground">6:00 PM</span>
                </div>
              </div>
            </div>
            
            {/* History Section */}
            <section>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                History
              </h3>
              
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                {officeHistory.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-3 border-b border-border/50 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{day.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {day.open} – {day.close}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      day.status === "open"
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {day.status === "open" ? "Active" : "Ended"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
