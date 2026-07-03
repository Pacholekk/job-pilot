import ApplicationBody from "@/components/applications/application/ApplicationBody/ApplicationBody";
import ApplicationHeader from "@/components/applications/application/ApplicationHeader/ApplicationHeader";
import { parseStack } from "@/lib/applications/map-application";
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
    <div className="p-10">
      <ApplicationHeader
        id={String(application.id)}
        companyInitials={application.company.slice(0, 2).toUpperCase()}
        jobTitle={application.position}
        companyName={application.company}
        location={application.location}
        status={application.status}
        jobType={application.jobType}
      />
      <ApplicationBody
        location={application.location}
        status={application.status}
        jobType={application.jobType}
        jobDescription={application.jobDescription}
        techStack={parseStack(application.techStack)}
        salary={application.salary}
      />
    </div>
  );
}
