import { JobType, Status } from "@/lib/generated/prisma/enums";

interface ApplicationBodyProps {
  location: string;
  jobDescription: string;
  jobType: JobType;
  salary: number | null;
  techStack: string[];
  status: Status;
}

export default function ApplicationBody({
  location,
  jobType,
  jobDescription,
  techStack,
  salary,
  status,
}: ApplicationBodyProps) {
  return (
    <div className="border rounded-2xl mt-10 p-8">
      <h2 className="text-xl font-semibold">Job details</h2>
      <div className="grid grid-cols-2  gap-x-16 gap-y-8 mt-5">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-500">Location</span>
          <span>{location}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-500">Tech stack</span>
          <span>{techStack ?? "Not specified"}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-500">Work type</span>
          <span>{jobType ?? "Not specified"}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-500">Salary</span>
          <span>{salary ?? "Not specified"}</span>
        </div>
      </div>
      <div className="mt-3">
        <span className="text-l font-semibold"> Description</span>
        <div className="text-sm border mt-2 p-5 rounded-xl bg-gray-50">
          {jobDescription}
        </div>
      </div>
    </div>
  );
}
