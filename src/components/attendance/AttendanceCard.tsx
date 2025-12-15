import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";

interface AttendanceCardProps {
  onMarkAttendance?: (status: "present" | "leave") => void;
}

export function AttendanceCard({ onMarkAttendance }: AttendanceCardProps) {
  const [isPresent, setIsPresent] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPresent && checkInTime && !checkOutTime) {
      interval = setInterval(() => {
        const now = new Date();
        const checkIn = new Date();
        const [hours, minutes] = checkInTime.split(":");
        checkIn.setHours(parseInt(hours), parseInt(minutes.split(" ")[0]), 0);
        
        const diff = now.getTime() - checkIn.getTime();
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        
        setElapsedTime(
          `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPresent, checkInTime, checkOutTime]);

  const handleCheckIn = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setCheckInTime(time);
    setIsPresent(true);
    setCheckOutTime(null);
    onMarkAttendance?.("present");
    toast.success("Checked in successfully!");
  };

  const handleCheckOut = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setCheckOutTime(time);
    toast.success("Checked out successfully!");
  };

  return (
    <Card className="p-6 rounded-3xl border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          isPresent ? "bg-success/10" : "bg-secondary"
        }`}>
          {isPresent ? (
            <CheckCircle2 className="w-6 h-6 text-success" />
          ) : (
            <Clock className="w-6 h-6 text-muted-foreground" />
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Today's Attendance</h2>
          <p className="text-sm text-muted-foreground">
            {isPresent ? "You're marked present" : "Mark your attendance"}
          </p>
        </div>
      </div>

      {isPresent && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-secondary/50 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Check In</p>
            <p className="text-sm font-semibold text-foreground">{checkInTime}</p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Check Out</p>
            <p className="text-sm font-semibold text-foreground">{checkOutTime || "—"}</p>
          </div>
          <div className="bg-primary/10 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Duration</p>
            <p className="text-sm font-semibold text-primary">{elapsedTime}</p>
          </div>
        </div>
      )}

      {!isPresent ? (
        <Button
          onClick={handleCheckIn}
          className="w-full h-12 rounded-2xl gap-2 bg-success hover:bg-success/90 text-success-foreground"
        >
          <LogIn className="w-5 h-5" />
          Mark Present
        </Button>
      ) : !checkOutTime ? (
        <Button
          onClick={handleCheckOut}
          variant="outline"
          className="w-full h-12 rounded-2xl gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5" />
          Check Out
        </Button>
      ) : (
        <div className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-success/10 text-success">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">Attendance Complete</span>
        </div>
      )}
    </Card>
  );
}
