"use client";

import { ApplicationFilters, ApplicationRow } from "@/lib/applications/types";
import ApplicationsTable from "./ApplicationsTable";
import { useEffect, useState } from "react";
import FilteringSection from "../FilteringSection/FilteringSection";
import { useRouter, useSearchParams } from "next/navigation";
import { parseApplicationFilters } from "./filters/parse-filters";
import { serializeApplicationFilters } from "./filters/serialize-filters";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { Button } from "../ui/button";

interface ApplicationListProps {
  initialRows: ApplicationRow[];
  total: number;
  totalPages: number;
  page: number;
}

export default function ApplicationList({
  initialRows,
  totalPages,
  page,
}: ApplicationListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const initialFilters = parseApplicationFilters(new URLSearchParams(params));
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
    router.replace(`/applications?${params}`);
    setFilters(nextFilters);
  };
  const debouncedSearch = useDebouncedValue(filters.search, 500);
  const handleNext = () => {
    if (page >= 1 && page < totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page + 1));
      router.replace(`/applications?${params.toString()}`);
    }
  };
  const handlePrev = () => {
    if (page > 1 && page <= totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page - 1));
      router.replace(`/applications?${params.toString()}`);
    }
  };

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

  return (
    <>
      <FilteringSection
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      <ApplicationsTable applications={initialRows} />
      <div className="flex  mt-10 justify-center gap-5 min-h-max">
        <Button onClick={handlePrev} disabled={page < 2}>
          Prev
        </Button>
        <span className="mt-1">
          Page: {page} of {totalPages}
        </span>
        <Button onClick={handleNext} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </>
  );
}
