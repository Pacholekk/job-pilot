"use client";

import {
  ApplicationFormData,
  applicationSchema,
} from "@/lib/validations/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ApplicationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = (data: ApplicationFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-xl flex-col gap-4 p-6"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="company">Company</label>
        <Input
          id="company"
          {...register("company")}
          placeholder="Company"
          aria-invalid={!!errors.company}
        />
        {errors.company && (
          <span className="text-sm text-destructive">
            {errors.company.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="position">Position</label>
        <Input
          id="position"
          {...register("position")}
          placeholder="Position"
          aria-invalid={!!errors.position}
        />
        {errors.position && (
          <span className="text-sm text-destructive">
            {errors.position.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="location">Location</label>
        <Input
          id="location"
          {...register("location")}
          placeholder="Location"
          aria-invalid={!!errors.location}
        />
        {errors.location && (
          <span className="text-sm text-destructive">
            {errors.location.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="offerUrl">Offer URL</label>
        <Input
          id="offerUrl"
          type="url"
          {...register("offerUrl")}
          placeholder="https://..."
          aria-invalid={!!errors.offerUrl}
        />
        {errors.offerUrl && (
          <span className="text-sm text-destructive">
            {errors.offerUrl.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="jobType">Job type</label>
        <select
          id="jobType"
          {...register("jobType")}
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-invalid={!!errors.jobType}
        >
          <option value="">Select job type</option>
          <option value="Onsite">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        {errors.jobType && (
          <span className="text-sm text-destructive">
            {errors.jobType.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="techStack">Tech stack</label>
        <Input
          id="techStack"
          {...register("techStack")}
          placeholder="React, TypeScript, Node.js..."
          aria-invalid={!!errors.techStack}
        />
        {errors.techStack && (
          <span className="text-sm text-destructive">
            {errors.techStack.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="salary">Salary</label>
        <Input
          id="salary"
          type="number"
          {...register("salary", {
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
          })}
          placeholder="Optional"
          aria-invalid={!!errors.salary}
        />
        {errors.salary && (
          <span className="text-sm text-destructive">
            {errors.salary.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="jobDescription">Job description</label>
        <Textarea
          id="jobDescription"
          {...register("jobDescription")}
          placeholder="Paste or summarize the job description..."
          aria-invalid={!!errors.jobDescription}
        />
        {errors.jobDescription && (
          <span className="text-sm text-destructive">
            {errors.jobDescription.message}
          </span>
        )}
      </div>

      <Button type="submit" className="mt-2 w-fit">
        Save application
      </Button>
    </form>
  );
}
