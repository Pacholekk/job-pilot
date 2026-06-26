import ApplicationHeader from "@/components/applications/application/ApplicationHeader/ApplicationHeader";
import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

export default async function ViewApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const applicationId = Number(id);

  if (Number.isNaN(applicationId)) {
    notFound();
  }

  const application = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
  });

  if (!application) {
    notFound();
  }

  return (
    <>
      <ApplicationHeader
        title={application.position}
        description={application.jobDescription}
        badges={[application.jobType, application.status]}
      />
    </>
  );
}
