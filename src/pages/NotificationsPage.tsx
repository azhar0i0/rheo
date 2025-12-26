import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Bell, Check, Settings, Filter 
} from "lucide-react";
import { NotificationItem, Notification, NotificationType } from "@/components/notifications/NotificationItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allNotifications: Notification[] = [
  {
    id: "1",
    type: "mention",
    title: "Sarah Chen mentioned you",
    message: "Hey @john.doe, can you review this design mockup when you get a chance?",
    time: "2 min ago",
    read: false,
    avatar: "SC",
  },
  {
    id: "2",
    type: "approval",
    title: "User pending approval",
    message: "Mike Johnson is waiting for admin approval to join the workspace",
    time: "15 min ago",
    read: false,
  },
  {
    id: "3",
    type: "report",
    title: "New report submitted",
    message: "Emily Davis submitted their daily report for review",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    type: "office",
    title: "Office status changed",
    message: "The office is now open for the day",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "message",
    title: "New message in #engineering",
    message: "Alex Kim: The deployment to staging was successful! 🚀",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "bucket",
    title: "Bucket item approved",
    message: "Your request for office chairs has been approved",
    time: "4 hours ago",
    read: true,
  },
  {
    id: "7",
    type: "attendance",
    title: "Attendance reminder",
    message: "Don't forget to mark your attendance for today",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "8",
    type: "mention",
    title: "James Brown mentioned you",
    message: "@john.doe great work on the project! 👏",
    time: "1 day ago",
    read: true,
    avatar: "JB",
  },
  {
    id: "9",
    type: "system",
    title: "System update",
    message: "Rheo has been updated with new features and improvements",
    time: "2 days ago",
    read: true,
  },
];

type FilterType = "all" | NotificationType;

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(allNotifications);
  const [filter, setFilter] = useState<FilterType>("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter((n) => n.type === filter);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(notifications.map((n) => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const groupedNotifications = filteredNotifications.reduce((acc, notification) => {
    const isToday = notification.time.includes("min") || notification.time.includes("hour");
    const isYesterday = notification.time.includes("1 day");
    const key = isToday ? "Today" : isYesterday ? "Yesterday" : "Earlier";
    
    if (!acc[key]) acc[key] = [];
    acc[key].push(notification);
    return acc;
  }, {} as Record<string, Notification[]>);

  return (
    <MobileLayout showNav={false}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 rounded-xl bg-secondary/80 hover:bg-secondary flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Notifications</h1>
                  {unreadCount > 0 && (
                    <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllRead}
                    className="h-9 px-3 rounded-xl text-xs gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Mark all read
                  </Button>
                )}
              </div>
            </div>

            {/* Filter */}
            <div className="mt-4">
              <Select value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
                <SelectTrigger className="h-10 rounded-xl bg-secondary/50 border-0 text-sm">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Filter notifications" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Notifications</SelectItem>
                  <SelectItem value="mention">Mentions</SelectItem>
                  <SelectItem value="message">Messages</SelectItem>
                  <SelectItem value="approval">Approvals</SelectItem>
                  <SelectItem value="report">Reports</SelectItem>
                  <SelectItem value="office">Office Status</SelectItem>
                  <SelectItem value="attendance">Attendance</SelectItem>
                  <SelectItem value="bucket">Bucket Items</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="px-4 py-4">
          {Object.entries(groupedNotifications).map(([group, items]) => (
            <div key={group} className="mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                {group}
              </h3>
              <Card className="rounded-2xl border-border overflow-hidden">
                {items.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={index < items.length - 1 ? "border-b border-border/50" : ""}
                  >
                    <NotificationItem
                      notification={notification}
                      onClick={() => handleNotificationClick(notification.id)}
                      showFullMessage
                    />
                  </div>
                ))}
              </Card>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">No notifications</h3>
              <p className="text-sm text-muted-foreground">
                You're all caught up!
              </p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
