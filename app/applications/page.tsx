import ApplicationsTable from "@/components/applications/ApplicationsTable";
import PageHeader from "@/components/PageHeader/PageHeader";
import { mapApplicationToRow } from "@/lib/applications/map-application";
import { prisma } from "@/lib/prisma";

export default async function ApplicationsPage() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = applications.map(mapApplicationToRow);

  return (
    <>
      <PageHeader
        title="Applications"
        description="Manage and track all your job applications."
      />
      <div className="p-6">
        <ApplicationsTable applications={rows} />
      </div>
    </>
  );
}
