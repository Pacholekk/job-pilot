import ApplicationStatusBadge from "@/components/applications/ApplicationStatusBadge";
import ApplicationRowActions from "@/components/applications/ApplicationRowActions";
import MatchScore from "@/components/applications/MatchScore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ApplicationRow } from "@/lib/applications/types";

interface ApplicationsTableProps {
  applications: ApplicationRow[];
}

const MAX_VISIBLE_TAGS = 3;

function formatAddedDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function StackTags({ stack }: { stack: string[] }) {
  const visible = stack.slice(0, MAX_VISIBLE_TAGS);
  const overflow = stack.length - MAX_VISIBLE_TAGS;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
        >
          {tag}
        </span>
      ))}
      {overflow > 0 && (
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          +{overflow}
        </span>
      )}
    </div>
  );
}

export default function ApplicationsTable({
  applications,
}: ApplicationsTableProps) {
  if (!applications.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <p className="text-sm font-medium">No applications yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your first application to start tracking.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Company & Role
            </TableHead>
            <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Stack
            </TableHead>
            <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Status
            </TableHead>
            <TableHead className="h-11 px-4 text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Match
            </TableHead>
            <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Salary
            </TableHead>
            <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Job type
            </TableHead>
            <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Added
            </TableHead>
            <TableHead className="h-11 w-12 px-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id} className="hover:bg-muted/30">
              <TableCell className="px-4 py-4 whitespace-normal">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground">
                    {application.companyInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {application.jobTitle}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {application.companyName} · {application.location}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-4 py-4 whitespace-normal">
                <StackTags stack={application.stack} />
              </TableCell>
              <TableCell className="px-4 py-4">
                <ApplicationStatusBadge status={application.status} />
              </TableCell>
              <TableCell className="px-4 py-4 text-center">
                <MatchScore score={application.matchScore} />
              </TableCell>
              <TableCell className="px-4 py-4 font-medium">
                {application.salaryRange}
              </TableCell>
              <TableCell className="px-4 py-4 font-medium">
                {application.jobType}
              </TableCell>
              <TableCell className="px-4 py-4 text-muted-foreground">
                {formatAddedDate(application.addedAt)}
              </TableCell>
              <TableCell className="px-4 py-4 text-right">
                <ApplicationRowActions applicationId={application.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
