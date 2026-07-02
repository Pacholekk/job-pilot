import { StatCardProps } from "@/components/StatCard/StatCard";
import { Status } from "../generated/prisma/enums";
import { prisma } from "../prisma";

export async function getDashboardStats() {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [totals, interviews, thisWeek] = await Promise.all([
    prisma.application.count(),
    prisma.application.count({
      where: {
        status: Status.Interview,
      },
    }),
    prisma.application.count({ where: { createdAt: { gte: weekAgo } } }),
  ]);
  const stats: StatCardProps[] = [
    { label: "Total applications", value: totals },
    { label: "Interviewing", value: interviews },
    { label: "Last week", value: thisWeek },
  ];
  return stats;
}
