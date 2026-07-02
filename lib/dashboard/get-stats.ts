import { StatCardProps } from "@/components/StatCard/StatCard";
import { Status } from "../generated/prisma/enums";
import { prisma } from "../prisma";
import {
  mapApplicationToItem,
  mapStatusCountToSegment,
} from "../applications/map-application";

export async function getDashboardStats() {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [applications, statusesCount, totals, interviews, thisWeek] =
    await Promise.all([
      prisma.application.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.application.groupBy({
        by: ["status"],
        _count: {
          status: true,
        },
      }),
      prisma.application.count(),
      prisma.application.count({
        where: {
          status: Status.Interview,
        },
      }),
      prisma.application.count({ where: { createdAt: { gte: weekAgo } } }),
    ]);
  const recentApplications = applications.map(mapApplicationToItem);
  const statusData = mapStatusCountToSegment(statusesCount);

  const stats: StatCardProps[] = [
    { label: "Total applications", value: totals },
    { label: "Interviewing", value: interviews },
    { label: "Last week", value: thisWeek },
  ];
  return { stats, recentApplications, statusData };
}
