import ApplicationForm from "@/components/applications/ApplicationsForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditApplicationPage({
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
    <div>
      <h1>Edit application</h1>

      <ApplicationForm
        applicationId={application.id}
        defaultValues={{
          company: application.company,
          position: application.position,
          location: application.location,
          offerUrl: application.offerUrl ?? "",
          jobType: application.jobType,
          status: application.status,
          techStack: application.techStack,
          salary: application.salary ?? undefined,
          jobDescription: application.jobDescription,
        }}
      />
    </div>
  );
}
