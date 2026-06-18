import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendColor?: "positive" | "neutral" | "negative";
}

export default function StatCard({
  label,
  value,
  trend,
  trendColor = "neutral",
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-normal text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 pt-2">
        <span className="text-2xl font-semibold">{value}</span>
        {trend && (
          <span
            className={cn(
              "text-xs",
              trendColor === "positive" && "text-emerald-600",
              trendColor === "negative" && "text-red-600",
              trendColor === "neutral" && "text-muted-foreground"
            )}
          >
            {trend}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
