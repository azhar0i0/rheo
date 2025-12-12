import { cn } from "@/lib/utils";

interface RoleBadgeProps {
  role: string;
}

const roleColors: Record<string, string> = {
  admin: "bg-primary/10 text-primary border-primary/20",
  manager: "bg-accent/10 text-accent-foreground border-accent/20",
  employee: "bg-secondary text-secondary-foreground border-secondary",
  intern: "bg-muted text-muted-foreground border-muted",
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const colorClass = roleColors[role.toLowerCase()] || roleColors.employee;
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize",
        colorClass
      )}
    >
      {role}
    </span>
  );
}
