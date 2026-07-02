import { z } from "zod";
import { JobType, Status } from "../generated/prisma/enums";

const jobType = z.enum(JobType, { error: "Job type is required" });

const status = z.enum(Status, {
  error: "Status is required",
});

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "position is required"),
  location: z.string().min(1, "location is required"),
  offerUrl: z
    .string()
    .optional()
    .transform((offer) => (offer === "" ? undefined : offer))
    .pipe(z.url()),
  jobType: jobType,
  status: status,
  techStack: z.string().min(1, "Tech stack is required"),
  salary: z.number().optional(),
  jobDescription: z.string().min(1, "Job description is required"),
});

export type ApplicationFormData = z.input<typeof applicationSchema>;
export type ApplicationFormOutput = z.output<typeof applicationSchema>;
