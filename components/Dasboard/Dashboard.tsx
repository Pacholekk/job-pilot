import AiInsights from "@/components/AiInsights/AiInsights";
import ApplicationStatus from "@/components/ApplicationStatus/ApplicationStatus";
import ItemsSection from "@/components/ItemsSection/ItemsSection";
import StatCard, { type StatCardProps } from "@/components/StatCard/StatCard";
import type { StatusSegment } from "@/components/ApplicationStatus/ApplicationStatus";

import {
  mapApplicationToItem,
  mapStatusCountToSegment,
} from "@/lib/applications/map-application";
import { prisma } from "@/lib/prisma";

export interface DashboardProps {
  stats: StatCardProps[];
  statusData: StatusSegment[];
  insights: string[];
}

export default async function Dashboard({ stats, insights }: DashboardProps) {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  const statusesCount = await prisma.application.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });
  const recentApplications = applications.map(mapApplicationToItem);
  const statusData = mapStatusCountToSegment(statusesCount);
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ItemsSection
            title="Recent applications"
            items={recentApplications}
          />
        </div>
        <div className="flex flex-col gap-6">
          <ApplicationStatus data={statusData} />
          <AiInsights insights={insights} />
        </div>
      </div>
    </div>
  );
}
