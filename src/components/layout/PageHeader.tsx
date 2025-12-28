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
  large?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  showNotifications = true,
  actions,
  className = "",
  large = false,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className={`sticky top-0 z-40 bg-background safe-top ${className}`}>
      <div className="px-4 py-3 border-b border-border/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full press-scale touch-target"
              >
                <ArrowLeft className="w-6 h-6 text-foreground" />
              </button>
            )}
            <div className="min-w-0">
              <h1 className={`font-semibold text-foreground truncate ${large ? 'text-2xl' : 'text-lg'}`}>
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-muted-foreground truncate mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {actions}
            {showNotifications && <NotificationBell />}
          </div>
        </div>
      </div>
    </header>
  );
}
