import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  AtSign, UserCheck, FileText, Building2, MessageSquare,
  ShoppingCart, Calendar, AlertCircle
} from "lucide-react";

export type NotificationType = 
  | "mention" 
  | "approval" 
  | "report" 
  | "office" 
  | "message" 
  | "bucket"
  | "attendance"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
  link?: string;
}

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
  showFullMessage?: boolean;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "mention":
      return { icon: AtSign, color: "text-primary", bg: "bg-primary/10" };
    case "approval":
      return { icon: UserCheck, color: "text-warning", bg: "bg-warning/10" };
    case "report":
      return { icon: FileText, color: "text-accent", bg: "bg-accent/10" };
    case "office":
      return { icon: Building2, color: "text-success", bg: "bg-success/10" };
    case "message":
      return { icon: MessageSquare, color: "text-primary", bg: "bg-primary/10" };
    case "bucket":
      return { icon: ShoppingCart, color: "text-warning", bg: "bg-warning/10" };
    case "attendance":
      return { icon: Calendar, color: "text-accent", bg: "bg-accent/10" };
    case "system":
      return { icon: AlertCircle, color: "text-muted-foreground", bg: "bg-secondary" };
    default:
      return { icon: AlertCircle, color: "text-muted-foreground", bg: "bg-secondary" };
  }
};

export function NotificationItem({ notification, onClick, showFullMessage }: NotificationItemProps) {
  const { icon: Icon, color, bg } = getNotificationIcon(notification.type);

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:bg-secondary/70 active:scale-[0.98] ${
        !notification.read ? "bg-primary/5" : ""
      }`}
    >
      {notification.avatar ? (
        <Avatar className="w-10 h-10 shrink-0">
          <AvatarFallback className={`${bg} ${color} font-medium text-sm`}>
            {notification.avatar}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-foreground/80"}`}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
          )}
        </div>
        <p className={`text-xs text-muted-foreground mt-0.5 ${showFullMessage ? "" : "line-clamp-2"}`}>
          {notification.message}
        </p>
        <p className="text-[10px] text-muted-foreground/70 mt-1">{notification.time}</p>
      </div>
    </button>
  );
}
