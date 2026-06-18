import AiInsights from "@/components/AiInsights/AiInsights";
import ApplicationStatus from "@/components/ApplicationStatus/ApplicationStatus";
import BestMatchingOffers from "@/components/BestMatchingOffers/BestMatchingOffers";
import ItemsSection from "@/components/ItemsSection/ItemsSection";
import StatCard, { type StatCardProps } from "@/components/StatCard/StatCard";
import type { StatusSegment } from "@/components/ApplicationStatus/ApplicationStatus";
import type { OfferCardProps } from "@/components/BestMatchingOffers/OfferCard/OfferCard";
import type { ItemProps } from "@/components/ItemsSection/ItemsList/Item/Item";

export interface DashboardProps {
  stats: StatCardProps[];
  recentApplications: ItemProps[];
  statusData: StatusSegment[];
  insights: string[];
  offers: OfferCardProps[];
}

export default function Dashboard({
  stats,
  recentApplications,
  statusData,
  insights,
  offers,
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
          <ItemsSection title="Recent applications" items={recentApplications} />
        </div>
        <div className="flex flex-col gap-6">
          <ApplicationStatus data={statusData} />
          <AiInsights insights={insights} />
        </div>
      </div>

      <BestMatchingOffers offers={offers} />
    </div>
  );
}
