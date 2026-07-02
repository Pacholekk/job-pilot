import ItemsSection from "@/components/ItemsSection/ItemsSection";
import StatCard, { type StatCardProps } from "@/components/StatCard/StatCard";

import { ItemProps } from "../ItemsSection/ItemsList/Item/Item";
import { StatusSegment } from "@/lib/applications/types";
import ApplicationStatus from "../ApplicationStatus/ApplicationStatus";

export interface DashboardProps {
  stats: StatCardProps[];
  statusData: StatusSegment[];
  recentApplications: ItemProps[];
}

export default async function Dashboard({
  stats,
  statusData,
  recentApplications,
}: DashboardProps) {
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
        </div>
      </div>
    </div>
  );
}
