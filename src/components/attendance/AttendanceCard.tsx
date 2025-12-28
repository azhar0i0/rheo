import { useState, useEffect } from "react";
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
        setElapsedTime(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
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
    toast.success("Checked in!");
  };

  const handleCheckOut = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setCheckOutTime(time);
    toast.success("Checked out!");
  };

  return (
    <div className="bg-card rounded-xl p-5 border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
          isPresent ? "bg-success/10" : "bg-secondary"
        }`}>
          {isPresent ? (
            <CheckCircle2 className="w-5 h-5 text-success" />
          ) : (
            <Clock className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-foreground">Today's Attendance</h2>
          <p className="text-sm text-muted-foreground">
            {isPresent ? "You're present" : "Mark your attendance"}
          </p>
        </div>
      </div>

      {isPresent && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">In</p>
            <p className="text-sm font-semibold text-foreground">{checkInTime}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Out</p>
            <p className="text-sm font-semibold text-foreground">{checkOutTime || "—"}</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-0.5">Duration</p>
            <p className="text-sm font-semibold text-primary">{elapsedTime}</p>
          </div>
        </div>
      )}

      {!isPresent ? (
        <button
          onClick={handleCheckIn}
          className="w-full h-12 rounded-lg bg-success text-success-foreground font-medium flex items-center justify-center gap-2 press-scale"
        >
          <LogIn className="w-5 h-5" />
          Check In
        </button>
      ) : !checkOutTime ? (
        <button
          onClick={handleCheckOut}
          className="w-full h-12 rounded-lg border border-destructive/30 text-destructive font-medium flex items-center justify-center gap-2 press-scale hover:bg-destructive/5"
        >
          <LogOut className="w-5 h-5" />
          Check Out
        </button>
      ) : (
        <div className="flex items-center justify-center gap-2 py-3 rounded-lg bg-success/10 text-success font-medium">
          <CheckCircle2 className="w-5 h-5" />
          Complete
        </div>
      )}
    </div>
  );
}
