import { z } from "zod";

const jobType = z.enum(["Hybrid", "Onsite", "Remote"], {
  error: "Job type is required",
});

const status = z.enum(
  [
    "Saved",
    "Applied",
    "Screening",
    "Interview",
    "Ghosted",
    "Offer",
    "Rejected",
  ],
  {
    error: "Status is required",
  },
);

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "position is required"),
  location: z.string().min(1, "location is required"),
  offerUrl: z.url().min(1, "offerUrl is required").optional(),
  jobType: jobType,
  status: status,
  techStack: z.string().min(1, "Tech stack is required"),
  salary: z.number().optional(),
  jobDescription: z.string().min(1, "Job description is required"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
