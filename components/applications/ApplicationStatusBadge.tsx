import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/components/ItemsSection/ItemsList/Item/Item";

export const statusConfig: Record<
  ApplicationStatus,
  { bg: string; text: string; dot: string }
> = {
  Saved: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-400",
  },
  Applied: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    dot: "bg-blue-500",
  },
  Screening: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    dot: "bg-orange-500",
  },
  Ghosted: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    dot: "bg-gray-500",
  },
  Interview: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    dot: "bg-purple-500",
  },
  Offer: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    dot: "bg-emerald-500",
  },
  Rejected: {
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-500",
  },
};

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

export default function ApplicationStatusBadge({
  status,
}: ApplicationStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        config.bg,
        config.text,
      )}
    >
      <span className={cn("size-1.5 shrink-0 rounded-full", config.dot)} />
      {status}
    </span>
  );
}
