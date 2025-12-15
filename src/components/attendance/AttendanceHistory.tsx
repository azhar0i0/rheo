import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, MinusCircle, Clock } from "lucide-react";

interface AttendanceLog {
  id: number;
  date: string;
  status: "present" | "absent" | "leave";
  checkIn?: string;
  checkOut?: string;
  duration?: string;
}

const mockLogs: AttendanceLog[] = [
  { id: 1, date: "Today", status: "present", checkIn: "9:00 AM", duration: "8h+" },
  { id: 2, date: "Dec 13", status: "present", checkIn: "9:15 AM", checkOut: "6:30 PM", duration: "9h 15m" },
  { id: 3, date: "Dec 12", status: "present", checkIn: "8:45 AM", checkOut: "5:45 PM", duration: "9h" },
  { id: 4, date: "Dec 11", status: "leave", duration: "—" },
  { id: 5, date: "Dec 10", status: "leave", duration: "—" },
  { id: 6, date: "Dec 9", status: "absent", duration: "—" },
  { id: 7, date: "Dec 8", status: "present", checkIn: "9:00 AM", checkOut: "6:00 PM", duration: "9h" },
];

export function AttendanceHistory() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "absent":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "leave":
        return <MinusCircle className="w-5 h-5 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return "bg-success/10 text-success";
      case "absent":
        return "bg-destructive/10 text-destructive";
      case "leave":
        return "bg-warning/10 text-warning";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="rounded-2xl border-border overflow-hidden">
      <div className="divide-y divide-border">
        {mockLogs.map((log) => (
          <div key={log.id} className="flex items-center gap-3 p-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getStatusBadge(log.status)}`}>
              {getStatusIcon(log.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{log.date}</p>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase ${getStatusBadge(log.status)}`}>
                  {log.status}
                </span>
              </div>
              {log.checkIn && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  {log.checkIn} - {log.checkOut || "In progress"}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{log.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
