import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ApplicationStatus =
  | "Saved"
  | "Applied"
  | "Screening"
  | "Interview"
  | "Ghosted"
  | "Offer"
  | "Rejected";

export interface ItemProps {
  companyInitials: string;
  jobTitle: string;
  companyName: string;
  status: ApplicationStatus;
  score: number;
}

const statusStyles: Record<ApplicationStatus, string> = {
  Saved: "bg-gray-100 text-gray-700",
  Applied: "bg-blue-100 text-blue-700",
  Screening: "bg-orange-100 text-orange-700",
  Ghosted: "bg-gray-, text-gray-700",
  Interview: "bg-purple-100 text-purple-700",
  Offer: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function Item({
  companyInitials,
  jobTitle,
  companyName,
  status,
  score,
}: ItemProps) {
  return (
    <div className="flex items-center gap-4 border-b px-4 py-3 last:border-b-0">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
        {companyInitials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{jobTitle}</p>
        <p className="truncate text-sm text-muted-foreground">{companyName}</p>
      </div>
      <Badge className={cn("shrink-0", statusStyles[status])}>{status}</Badge>
      <span className="w-8 shrink-0 text-right text-sm font-medium">
        {score}
      </span>
    </div>
  );
}
