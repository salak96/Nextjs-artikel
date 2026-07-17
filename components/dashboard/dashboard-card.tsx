import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
}

export function DashboardCard({ title, value, icon: Icon, description }: DashboardCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold text-foreground">{value}</p>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
