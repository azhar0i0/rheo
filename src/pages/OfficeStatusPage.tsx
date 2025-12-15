import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Clock, Calendar, UserCheck } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("attendance");

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-24">
        <h1 className="text-2xl font-bold text-foreground mb-4">Office</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-12 mb-4 p-1 rounded-2xl bg-secondary/80">
            <TabsTrigger value="attendance" className="flex-1 h-full rounded-xl gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <UserCheck className="w-4 h-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="office" className="flex-1 h-full rounded-xl gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Building2 className="w-4 h-4" />
              Office Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="mt-0 space-y-4">
            {/* Daily Attendance Card */}
            <AttendanceCard />

            {/* Calendar View */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Attendance Calendar</h3>
              </div>
              <AttendanceCalendar />
            </div>

            {/* Attendance History */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Recent History</h3>
              </div>
              <AttendanceHistory />
            </div>
          </TabsContent>

          <TabsContent value="office" className="mt-0">
            <Card className="p-6 rounded-3xl border-border shadow-lg mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isOpen ? "bg-success/10" : "bg-muted"}`}>
                    <Building2 className={`w-7 h-7 ${isOpen ? "text-success" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Office is {isOpen ? "Open" : "Closed"}
                    </h2>
                    <p className="text-muted-foreground">Main Headquarters</p>
                  </div>
                </div>
                <span className={`w-4 h-4 rounded-full animate-pulse-soft ${isOpen ? "bg-success" : "bg-muted-foreground"}`} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Opens at</span>
                  </div>
                  <span className="text-lg font-semibold text-foreground">8:00 AM</span>
                </div>
                <div className="bg-secondary/50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Closes at</span>
                  </div>
                  <span className="text-lg font-semibold text-foreground">6:00 PM</span>
                </div>
              </div>
            </Card>
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Office History</h3>
              </div>
              
              <div className="space-y-3">
                {officeHistory.map((day, index) => (
                  <Card
                    key={index}
                    className="p-4 rounded-2xl border-border flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-foreground">{day.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {day.open} – {day.close}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      day.status === "open"
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {day.status === "open" ? "Active" : "Ended"}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
}
