import { SquarePen } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import ApplicationStatusBadge from "@/components/applications/ApplicationStatusBadge";
import type { ApplicationStatus } from "@/components/ItemsSection/ItemsList/Item/Item";
import { JobType } from "@/lib/generated/prisma/enums";
import { StatusSelect } from "../StatusSelect/StatusSelect";

interface ApplicationHeaderProps {
  id: string;
  companyInitials: string;
  jobTitle: string;
  companyName: string;
  location: string;
  status: ApplicationStatus;
  jobType: JobType;
}

export default function ApplicationHeader({
  id,
  companyInitials,
  jobTitle,
  companyName,
  location,
  status,
  jobType,
}: ApplicationHeaderProps) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="flex items-start gap-5">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-muted text-lg font-semibold">
          {companyInitials}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">{jobTitle}</h2>
          <p className="mt-1">
            {companyName} · {location}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <ApplicationStatusBadge status={status} />
            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {jobType}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link href={`/applications/edit/${id}`} className="gap-2">
                <SquarePen className="size-4" />
                Edit
              </Link>
            </Button>
            <StatusSelect id={Number(id)} currentStatus={status} />
          </div>
        </div>
      </div>
    </div>
  );
}
