import type { ApplicationRow } from "@/lib/applications/types";

export function matchesSearch(row: ApplicationRow, search: string) {
  const query = search.trim().toLowerCase();
  if (!query) return true;

  return (
    row.companyName.toLowerCase().includes(query) ||
    row.jobTitle.toLowerCase().includes(query)
  );
}
