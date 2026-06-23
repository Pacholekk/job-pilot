"use client";

import { ApplicationFilters, ApplicationRow } from "@/lib/applications/types";
import ApplicationsTable from "./ApplicationsTable";
import { useEffect, useMemo, useState } from "react";
import FilteringSection from "../FilteringSection/FilteringSection";
import { useRouter, useSearchParams } from "next/navigation";
import { parseApplicationFilters } from "./filters/parse-filters";
import { serializeApplicationFilters } from "./filters/serialize-filters";
import { matchesSearch } from "./filters/matches-search";
import useDebouncedValue from "@/hooks/useDebouncedValue";

interface ApplicationListProps {
  initialRows: ApplicationRow[];
}

export default function ApplicationList({ initialRows }: ApplicationListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialFilters = parseApplicationFilters(
    new URLSearchParams(searchParams.toString()),
  );
  const [filters, setFilters] = useState<ApplicationFilters>(initialFilters);
  const handleFiltersChange = (nextFilters: ApplicationFilters) => {
    if (
      nextFilters.search !== filters.search &&
      nextFilters.jobType === filters.jobType &&
      nextFilters.status === filters.status
    ) {
      setFilters(nextFilters);
      return;
    }
    const params = serializeApplicationFilters(searchParams, nextFilters);
    router.replace(`/applications?${params.toString()}`);
    setFilters(nextFilters);
  };
  const debouncedSearch = useDebouncedValue(filters.search, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmedSearch = debouncedSearch.trim();

    if (trimmedSearch === "") params.delete("search");
    else {
      params.set("search", trimmedSearch);
    }
    if (searchParams.toString() === params.toString()) return;

    router.replace(`/applications?${params.toString()}`);
  }, [debouncedSearch, router, searchParams]);

  const filteredRows = useMemo(() => {
    return initialRows.filter((row) => {
      const jobTypeMatches =
        filters.jobType === "all" || row.jobType === filters.jobType;

      const statusMatches =
        filters.status === "all" || row.status === filters.status;
      const searchMatches = matchesSearch(row, debouncedSearch);

      return jobTypeMatches && statusMatches && searchMatches;
    });
  }, [filters.status, filters.jobType, initialRows, debouncedSearch]);

  return (
    <>
      <FilteringSection
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      <ApplicationsTable applications={filteredRows} />
    </>
  );
}
