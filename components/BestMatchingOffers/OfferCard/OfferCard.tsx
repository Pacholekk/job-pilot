import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface OfferCardProps {
  companyInitials: string;
  companyName: string;
  jobTitle: string;
  matchScore: number;
  tags: string[];
  salaryRange: string;
  location: string;
}

export default function OfferCard({
  companyInitials,
  companyName,
  jobTitle,
  matchScore,
  tags,
  salaryRange,
  location,
}: OfferCardProps) {
  return (
    <Card className="min-w-[280px] shrink-0">
      <CardContent className="flex flex-col gap-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
              {companyInitials}
            </div>
            <div>
              <p className="font-medium">{jobTitle}</p>
              <p className="text-sm text-muted-foreground">{companyName}</p>
            </div>
          </div>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-emerald-500/20 text-sm font-semibold text-emerald-600">
            {matchScore}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{salaryRange}</span>
          <span>{location}</span>
        </div>
      </CardContent>
    </Card>
  );
}
