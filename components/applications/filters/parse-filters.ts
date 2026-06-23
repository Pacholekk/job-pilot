import type { ApplicationFilters } from "@/lib/applications/types";
import { isValidJobType, isValidStatus } from "./filters";

export const parseApplicationFilters = (
  params: URLSearchParams,
): ApplicationFilters => {
  const statusParam = params.get("status");
  const jobTypeParam = params.get("jobType");
  const searchParam = params.get("search") ?? "";
  const validStatus = isValidStatus(statusParam) ? statusParam : "all";
  const validJobType = isValidJobType(jobTypeParam) ? jobTypeParam : "all";

  return {
    status: validStatus,
    jobType: validJobType,
    search: searchParam,
  };
};
