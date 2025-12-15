import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, MinusCircle } from "lucide-react";

interface AttendanceRecord {
  date: number;
  status: "present" | "absent" | "leave";
  checkIn?: string;
  checkOut?: string;
}

const mockAttendanceData: AttendanceRecord[] = [
  { date: 1, status: "present", checkIn: "9:00 AM", checkOut: "6:00 PM" },
  { date: 2, status: "present", checkIn: "9:15 AM", checkOut: "6:30 PM" },
  { date: 3, status: "present", checkIn: "8:45 AM", checkOut: "5:45 PM" },
  { date: 4, status: "leave" },
  { date: 5, status: "leave" },
  { date: 6, status: "absent" },
  { date: 7, status: "present", checkIn: "9:30 AM", checkOut: "6:00 PM" },
  { date: 8, status: "present", checkIn: "9:00 AM", checkOut: "6:15 PM" },
  { date: 9, status: "present", checkIn: "9:00 AM", checkOut: "6:00 PM" },
  { date: 10, status: "present", checkIn: "9:05 AM", checkOut: "6:00 PM" },
  { date: 11, status: "present", checkIn: "9:00 AM", checkOut: "5:30 PM" },
  { date: 12, status: "present", checkIn: "9:10 AM", checkOut: "6:00 PM" },
  { date: 13, status: "absent" },
  { date: 14, status: "present", checkIn: "9:00 AM" },
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function AttendanceCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const today = new Date().getDate();
  const isCurrentMonth = 
    currentMonth.getMonth() === new Date().getMonth() && 
    currentMonth.getFullYear() === new Date().getFullYear();

  const getAttendanceForDate = (date: number): AttendanceRecord | undefined => {
    return mockAttendanceData.find(a => a.date === date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-success text-success-foreground";
      case "absent": return "bg-destructive text-destructive-foreground";
      case "leave": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "present": return <div className="w-1.5 h-1.5 rounded-full bg-success" />;
      case "absent": return <div className="w-1.5 h-1.5 rounded-full bg-destructive" />;
      case "leave": return <div className="w-1.5 h-1.5 rounded-full bg-warning" />;
      default: return null;
    }
  };

  const selectedAttendance = selectedDate ? getAttendanceForDate(selectedDate) : null;

  return (
    <Card className="p-4 rounded-2xl border-border">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-lg"
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3 className="font-semibold text-foreground">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-lg"
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs text-muted-foreground font-medium py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = i + 1;
          const attendance = getAttendanceForDate(date);
          const isToday = isCurrentMonth && date === today;
          const isSelected = selectedDate === date;
          const isFuture = isCurrentMonth && date > today;

          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              disabled={isFuture}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all relative ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : isToday
                  ? "bg-primary/10 text-primary font-semibold"
                  : isFuture
                  ? "text-muted-foreground/50"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              <span>{date}</span>
              {!isSelected && attendance && (
                <div className="absolute bottom-1">
                  {getStatusIndicator(attendance.status)}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">Present</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-warning" />
          <span className="text-xs text-muted-foreground">Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-destructive" />
          <span className="text-xs text-muted-foreground">Absent</span>
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedAttendance && (
        <div className="mt-4 p-3 rounded-xl bg-secondary/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedAttendance.status === "present" && <CheckCircle2 className="w-5 h-5 text-success" />}
              {selectedAttendance.status === "absent" && <XCircle className="w-5 h-5 text-destructive" />}
              {selectedAttendance.status === "leave" && <MinusCircle className="w-5 h-5 text-warning" />}
              <div>
                <p className="text-sm font-medium text-foreground capitalize">{selectedAttendance.status}</p>
                <p className="text-xs text-muted-foreground">
                  {currentMonth.toLocaleString("default", { month: "short" })} {selectedDate}
                </p>
              </div>
            </div>
            {selectedAttendance.checkIn && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  {selectedAttendance.checkIn} - {selectedAttendance.checkOut || "—"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
