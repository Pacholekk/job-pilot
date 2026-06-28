"use client";
import { SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import ApplicationStatusBadge from "@/components/applications/ApplicationStatusBadge";
import type { ApplicationStatus } from "@/components/ItemsSection/ItemsList/Item/Item";
import { JobType, Status } from "@/lib/generated/prisma/enums";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [appStatus, setAppStatus] = useState<Status>(status);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (newStatus: Status) => {
      const response = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to change status");
    },
    onSuccess: () => router.refresh(),
    onError: () => alert("Failed to change status"),
  });

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

          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="outline">
              <SquarePen />
              Edit
            </Button>
            <select
              className="border-1 border-gray-200 rounded-xl appearance-none px-3 py-1"
              value={appStatus}
              onChange={(e) => {
                const next = e.target.value as Status;
                setAppStatus(next);
                mutation.mutate(next);
              }}
            >
              {" "}
              {Object.values(Status).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
