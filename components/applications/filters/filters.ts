import { ApplicationStatus } from "@/components/ItemsSection/ItemsList/Item/Item";
import { JobType, Status } from "@/lib/generated/prisma/enums";

export const isValidStatus = (
  value: string | null,
): value is ApplicationStatus => {
  if (value === null) return false;
  return Object.values(Status).some((status) => status === value);
};
export const isValidJobType = (value: string | null): value is JobType => {
  if (value === null) return false;
  return Object.values(JobType).some((jobType) => jobType === value);
};
