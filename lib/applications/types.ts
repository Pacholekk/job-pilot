import type { ApplicationStatus } from "@/components/ItemsSection/ItemsList/Item/Item";
import { JobType } from "../generated/prisma/enums";

export interface ApplicationRow {
  id: number;
  companyInitials: string;
  jobTitle: string;
  companyName: string;
  location: string;
  stack: string[];
  status: ApplicationStatus;
  matchScore: number;
  jobType: JobType;
  salaryRange: string;
  addedAt: Date;
}
