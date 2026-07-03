"use client";

import { updateApplicationStatus } from "@/app/applications/actions";
import { Status } from "@/lib/generated/prisma/enums";
import { useTransition } from "react";

interface StatusSelectProps {
  id: number;
  currentStatus: Status;
}

export function StatusSelect({ id, currentStatus }: StatusSelectProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      className="border border-gray-200 rounded-xl appearance-none px-3 py-1"
      value={currentStatus}
      onChange={(e) => {
        startTransition(() => updateApplicationStatus(id, e.target.value));
      }}
      disabled={isPending}
    >
      {" "}
      {Object.values(Status).map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
