import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Clock, Calendar, ChevronRight } from "lucide-react";

const officeHistory = [
  { date: "Today", open: "8:00 AM", close: "6:00 PM", status: "open" },
  { date: "Dec 11", open: "8:30 AM", close: "5:30 PM", status: "closed" },
  { date: "Dec 10", open: "8:00 AM", close: "6:00 PM", status: "closed" },
  { date: "Dec 9", open: "9:00 AM", close: "5:00 PM", status: "closed" },
  { date: "Dec 8", open: "8:00 AM", close: "6:30 PM", status: "closed" },
];

export default function OfficeStatusPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <MobileLayout>
      <div className="px-4 pt-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">Office Status</h1>
        
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
          
          <div className="grid grid-cols-2 gap-4 mb-6">
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
          
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full h-14 rounded-2xl font-semibold text-base transition-all ${
              isOpen
                ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                : "gradient-accent text-accent-foreground hover:opacity-90"
            }`}
            variant="ghost"
          >
            {isOpen ? "Close Office" : "Open Office"}
          </Button>
        </Card>
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">History</h3>
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
      </div>
    </MobileLayout>
  );
}
