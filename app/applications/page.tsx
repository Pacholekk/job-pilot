import ApplicationList from "@/components/applications/ApplicationList";
import {
  isValidJobType,
  isValidStatus,
} from "@/components/applications/filters/filters";
import PageHeader from "@/components/PageHeader/PageHeader";
import { mapApplicationToRow } from "@/lib/applications/map-application";
import { JobType, Status } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {
    page = "1",
    status,
    jobType,
    search,
    pageSize = "10",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = await searchParams;
  const take = Number(pageSize);
  const skip = (Number(page) - 1) * Number(pageSize);
  const statusParam = Array.isArray(status) ? undefined : status;
  const jobTypeParam = Array.isArray(jobType) ? undefined : jobType;
  const searchParam = Array.isArray(search) ? undefined : search;
  const where = {
    status: isValidStatus(statusParam ?? null)
      ? (statusParam as Status)
      : undefined,
    jobType: isValidJobType(jobTypeParam ?? null)
      ? (jobTypeParam as JobType)
      : undefined,
    OR: searchParam
      ? [
          { company: { contains: searchParam } },
          { position: { contains: searchParam } },
        ]
      : undefined,
  };

  const [applications, totals] = await Promise.all([
    prisma.application.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy.toString()]: sortOrder },
    }),
    prisma.application.count({
      where,
    }),
  ]);

  const totalPages = Math.ceil(totals / take);
  const rows = applications.map(mapApplicationToRow);

  return (
    <>
      <PageHeader
        title="Applications"
        description="Manage and track all your job applications."
      />
      <div className="p-6">
        <ApplicationList
          initialRows={rows}
          totalPages={totalPages}
          page={Number(page)}
          total={totals}
        />
      </div>
    </>
  );
}
