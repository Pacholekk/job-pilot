import type { Application } from "@/lib/generated/prisma/client";
import type {
  ApplicationStatus,
  ItemProps,
} from "@/components/ItemsSection/ItemsList/Item/Item";

import type { ApplicationRow, StatusSegment } from "./types";

function getCompanyInitials(company: string) {
  return company
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function formatSalary(salary: number | null) {
  if (!salary) return "—";
  const low = Math.round(salary / 1000);
  const high = low + 40;
  return `$${low}k–$${high}k`;
}

const statusColors: Record<ApplicationStatus, string> = {
  Saved: "#6b7280",
  Applied: "#3b82f6",
  Screening: "#a855f7",
  Ghosted: "#6b7280",
  Interview: "#f59e0b",
  Offer: "#22c55e",
  Rejected: "#ef4444",
};

type StatusCount = {
  status: ApplicationStatus;
  _count: {
    status: number;
  };
};

export function mapStatusCountToSegment(items: StatusCount[]): StatusSegment[] {
  return items.map((item) => ({
    label: item.status,
    count: item._count.status,
    color: statusColors[item.status],
  }));
}
function parseStack(techStack: string) {
  return techStack
    .split(/[,;|/]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function deriveMatchScore(id: number) {
  return 50 + ((id * 17) % 45);
}

export function mapApplicationToItem(application: Application): ItemProps {
  return {
    companyInitials: getCompanyInitials(application.company),
    jobTitle: application.position,
    companyName: application.company,
    status: application.status,
    score: deriveMatchScore(application.id),
  };
}

export function mapApplicationToRow(application: Application): ApplicationRow {
  return {
    id: application.id,
    companyInitials: getCompanyInitials(application.company),
    jobTitle: application.position,
    companyName: application.company,
    location: application.location,
    stack: parseStack(application.techStack),
    status: application.status,
    jobType: application.jobType,
    matchScore: deriveMatchScore(application.id),
    salaryRange: formatSalary(application.salary),
    addedAt: application.createdAt,
  };
}
