"use client";

import {
  ApplicationRow,
  DEFAULT_APPLICATION_FILTERS,
} from "@/lib/applications/types";
import ApplicationsTable from "./ApplicationsTable";
import { useMemo, useState } from "react";
import FilteringSection from "../FilteringSection/FilteringSection";

interface ApplicationListProps {
  initialRows: ApplicationRow[];
}

function matchesSearch(row: ApplicationRow, search: string) {
  const query = search.trim().toLowerCase();
  if (!query) return true;

  return (
    row.companyName.toLowerCase().includes(query) ||
    row.jobTitle.toLowerCase().includes(query)
  );
}

export default function ApplicationList({ initialRows }: ApplicationListProps) {
  const [filters, setFilters] = useState(DEFAULT_APPLICATION_FILTERS);
  const filteredRows = useMemo(() => {
    return initialRows.filter((row) => {
      const jobTypeMatches =
        filters.jobType === "all" || row.jobType === filters.jobType;

      const statusMatches =
        filters.status === "all" || row.status === filters.status;
      const searchMatches = matchesSearch(row, filters.search);

      return jobTypeMatches && statusMatches && searchMatches;
    });
  }, [filters, initialRows]);

  return (
    <>
      <FilteringSection filters={filters} onFiltersChange={setFilters} />
      <ApplicationsTable applications={filteredRows} />
    </>
  );
}
