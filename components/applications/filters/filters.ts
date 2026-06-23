import { ApplicationStatus } from "@/components/ItemsSection/ItemsList/Item/Item";
import { jobTypes, statuses } from "@/lib/applications/map-application";
import { JobType } from "@/lib/generated/prisma/enums";

export const isValidStatus = (
  value: string | null,
): value is ApplicationStatus => {
  if (value === null) return false;
  return statuses.some((status) => status === value);
};
export const isValidJobType = (value: string | null): value is JobType => {
  if (value === null) return false;
  return jobTypes.some((jobType) => jobType === value);
};
