import Dashboard from "@/components/Dasboard/Dashboard";
import PageHeader from "@/components/PageHeader/PageHeader";
import { getDashboardStats } from "@/lib/dashboard/get-stats";

export default async function Home() {
  const { stats, statusData, recentApplications } = await getDashboardStats();
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Track your job search progress and AI insights."
      />
      <Dashboard
        stats={stats}
        statusData={statusData}
        recentApplications={recentApplications}
      />
    </>
  );
}
