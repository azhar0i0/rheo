import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
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
      {/* Header with Notifications */}
      <PageHeader title="Office" />

      <div className="px-4 pt-4 pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-12 mb-6 p-1 rounded-2xl bg-secondary/80 border border-border/50">
            <TabsTrigger 
              value="attendance" 
              className="flex-1 h-full rounded-xl gap-2 font-semibold transition-all data-[state=active]:bg-card data-[state=active]:shadow-lg data-[state=active]:shadow-primary/5"
            >
              <UserCheck className="w-4 h-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger 
              value="office" 
              className="flex-1 h-full rounded-xl gap-2 font-semibold transition-all data-[state=active]:bg-card data-[state=active]:shadow-lg data-[state=active]:shadow-primary/5"
            >
              <Building2 className="w-4 h-4" />
              Office Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="mt-0 space-y-6">
            {/* Daily Attendance Card */}
            <AttendanceCard />

            {/* Calendar View */}
            <section>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Attendance Calendar</h3>
              </div>
              <AttendanceCalendar />
            </section>

            {/* Attendance History */}
            <section>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Recent History</h3>
              </div>
              <AttendanceHistory />
            </section>
          </TabsContent>

          <TabsContent value="office" className="mt-0 space-y-6">
            {/* Main Status Card */}
            <Card className="p-6 rounded-3xl border-border/50 shadow-xl bg-gradient-to-br from-card to-card/80">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    isOpen 
                      ? "bg-gradient-to-br from-success/20 to-success/10" 
                      : "bg-muted"
                  }`}>
                    <Building2 className={`w-8 h-8 ${isOpen ? "text-success" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Office is {isOpen ? "Open" : "Closed"}
                    </h2>
                    <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <p className="text-sm">Main Headquarters</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <span className={`w-4 h-4 rounded-full ${isOpen ? "bg-success" : "bg-muted-foreground"}`} />
                  {isOpen && (
                    <span className="absolute inset-0 w-4 h-4 rounded-full bg-success animate-ping opacity-50" />
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/50 rounded-2xl p-4 border border-border/30">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">Opens at</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">8:00 AM</span>
                </div>
                <div className="bg-secondary/50 rounded-2xl p-4 border border-border/30">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">Closes at</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">6:00 PM</span>
                </div>
              </div>
            </Card>
            
            {/* Office History */}
            <section>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Office History</h3>
              </div>
              
              <div className="space-y-2.5">
                {officeHistory.map((day, index) => (
                  <Card
                    key={index}
                    className="p-4 rounded-2xl border-border/50 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{day.date}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {day.open} – {day.close}
                      </p>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      day.status === "open"
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {day.status === "open" ? "Active" : "Ended"}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
