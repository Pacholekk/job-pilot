"use client";

import { ApplicationFilters } from "@/lib/applications/types";

interface FilteringSectionProps {
  filters: ApplicationFilters;
  onFiltersChange: (filters: ApplicationFilters) => void;
}

export default function FilteringSection({
  filters,
  onFiltersChange,
}: FilteringSectionProps) {
  return (
    <div className="  px-10 py-5 border-2 mb-5 rounded-xl">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center ">
        <input
          type="search"
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
          value={filters.search}
          placeholder="Search company"
          className="border-2 px-4 py-2 w-2xl rounded-3xl relative min-w-0 "
        />

        <div className="flex gap-10">
          <select
            value={filters.status}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                status: e.target.value as ApplicationFilters["status"],
              })
            }
            className="h-8 w-36 rounded-lg "
          >
            {" "}
            <option value="all">All</option>
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Ghosted">Ghosted</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={filters.jobType}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                jobType: e.target.value as ApplicationFilters["jobType"],
              })
            }
            className="h-8 w-36 rounded-lg "
          >
            <option value="all">All</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">On-site</option>
          </select>
        </div>
      </div>
    </div>
  );
}
