import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusSegment } from "@/lib/applications/types";

export interface ApplicationStatusProps {
  title?: string;
  data: StatusSegment[];
}

export default function ApplicationStatus({
  title = "Application status",
  data,
}: ApplicationStatusProps) {
  const total = data.reduce((sum, segment) => sum + segment.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex h-3 overflow-hidden rounded-full bg-muted">
          {data.map((segment) => (
            <div
              key={segment.label}
              className="h-full"
              style={{
                width: `${total > 0 ? (segment.count / total) * 100 : 0}%`,
                backgroundColor: segment.color,
              }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {data.map((segment) => (
            <div
              key={segment.label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span>
                {segment.label} ({segment.count})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
