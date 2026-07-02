"use client";

import {
  ApplicationFormData,
  ApplicationFormOutput,
  applicationSchema,
} from "@/lib/validations/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

type ApplicationFormProps = {
  defaultValues?: ApplicationFormData;
  applicationId?: number;
};

export default function ApplicationForm({
  defaultValues,
  applicationId,
}: ApplicationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData, unknown, ApplicationFormOutput>({
    resolver: zodResolver(applicationSchema),
    defaultValues,
  });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (data: ApplicationFormOutput) => {
      const response = await fetch(
        applicationId
          ? `/api/applications/${applicationId}`
          : "/api/applications/",
        {
          method: applicationId ? "PUT" : "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          errors?: Record<string, string[]>;
        } | null;

        const firstError = body?.errors
          ? Object.values(body.errors).flat()[0]
          : undefined;

        throw new Error(firstError ?? "Nie udało się zapisać aplikacji");
      }
      return response.json();
    },
    onSuccess: () => router.push("/applications"),
  });

  const onSubmit = (data: ApplicationFormOutput) => {
    mutation.mutate(data);
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
          defaultValue={""}
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
        <label htmlFor="status">Status</label>
        <select
          id="status"
          {...register("status")}
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-invalid={!!errors.status}
        >
          <option value="">Select application status</option>
          <option value="Saved">Saved</option>
          <option value="Applied">Applied</option>
          <option value="Screening">Screening</option>
          <option value="Interview">Interview</option>
          <option value="Ghosted">Ghosted</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        {errors.status && (
          <span className="text-sm text-destructive">
            {errors.status.message}
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

      <Button type="submit" className="mt-2 w-fit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save application"}
      </Button>
      {mutation.isError && (
        <p className="text-red-500">{mutation.error.message}</p>
      )}
    </form>
  );
}
