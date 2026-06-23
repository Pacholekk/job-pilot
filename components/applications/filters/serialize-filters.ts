import type { ApplicationFilters } from "@/lib/applications/types";

export const serializeApplicationFilters = (
  params: URLSearchParams,
  filters: ApplicationFilters,
): URLSearchParams => {
  const nextParams = new URLSearchParams(params.toString());
  if (filters.status === "all") nextParams.delete("status");
  else {
    nextParams.set("status", filters.status);
  }
  if (filters.jobType === "all") nextParams.delete("jobType");
  else {
    nextParams.set("jobType", filters.jobType);
  }
  return nextParams;
};
