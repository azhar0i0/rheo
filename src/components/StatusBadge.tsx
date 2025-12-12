import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "online" | "offline" | "pending" | "submitted";
  size?: "sm" | "md";
}

const statusConfig = {
  online: { color: "bg-success", label: "Online" },
  offline: { color: "bg-muted-foreground", label: "Offline" },
  pending: { color: "bg-warning", label: "Pending" },
  submitted: { color: "bg-primary", label: "Submitted" },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "rounded-full animate-pulse-soft",
          config.color,
          size === "sm" ? "w-2 h-2" : "w-3 h-3"
        )}
      />
      <span className={cn("font-medium", size === "sm" ? "text-xs" : "text-sm")}>
        {config.label}
      </span>
    </div>
  );
}
