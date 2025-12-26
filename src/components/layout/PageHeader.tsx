import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NotificationBell } from "@/components/notifications/NotificationBell";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showNotifications?: boolean;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  showNotifications = true,
  actions,
  className = "",
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className={`sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50 ${className}`}>
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-xl bg-secondary/80 hover:bg-secondary flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-bold text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {actions}
            {showNotifications && <NotificationBell />}
          </div>
        </div>
      </div>
    </header>
  );
}
