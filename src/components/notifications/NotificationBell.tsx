import { useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotificationItem, Notification } from "./NotificationItem";

const recentNotifications: Notification[] = [
  {
    id: "1",
    type: "mention",
    title: "Sarah Chen mentioned you",
    message: "Hey @john.doe, can you review this?",
    time: "2 min ago",
    read: false,
    avatar: "SC",
  },
  {
    id: "2",
    type: "approval",
    title: "User pending approval",
    message: "Mike Johnson is waiting for approval",
    time: "15 min ago",
    read: false,
  },
  {
    id: "3",
    type: "report",
    title: "New report submitted",
    message: "Emily Davis submitted their daily report",
    time: "1 hour ago",
    read: true,
  },
];

export function NotificationBell() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = recentNotifications.filter((n) => !n.read).length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="relative w-10 h-10 rounded-xl bg-secondary/80 hover:bg-secondary flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95">
          <Bell className="w-5 h-5 text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 rounded-2xl border-border shadow-xl"
        align="end"
        sideOffset={8}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {recentNotifications.length > 0 ? (
            <div className="p-2">
              {recentNotifications.slice(0, 5).map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </div>

        <div className="p-2 border-t border-border">
          <button
            onClick={() => {
              navigate("/notifications");
              setIsOpen(false);
            }}
            className="w-full py-2.5 text-sm font-medium text-primary hover:bg-primary/5 rounded-xl transition-colors"
          >
            View all notifications
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
