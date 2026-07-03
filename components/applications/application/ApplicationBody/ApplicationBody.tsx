import { JobType, Status } from "@/lib/generated/prisma/enums";

type StatusHistoryEntry = {
  id: number;
  status: Status;
  createdAt: Date;
};

interface ApplicationBodyProps {
  location: string;
  jobDescription: string;
  jobType: JobType;
  salary: number | null;
  techStack: string[];
  statusHistory: StatusHistoryEntry[];
}

export default function ApplicationBody({
  location,
  jobType,
  jobDescription,
  techStack,
  salary,
  statusHistory,
}: ApplicationBodyProps) {
  return (
    <div className="flex  gap-10">
      <div className="border rounded-2xl mt-10 p-8 flex-3">
        <h2 className="text-xl font-semibold">Job details</h2>
        <div className="grid grid-cols-2  gap-x-16 gap-y-4 mt-5">
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
      <div className="border rounded-2xl mt-10 p-8 flex-1">
        <span className="text-xl font-semibold">Progress</span>
        <div className="mt-5 flex flex-col">
          {statusHistory.map((entry, index) => {
            const isLast = index === statusHistory.length - 1;
            return (
              <div key={entry.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full bg-gray-900" />
                  {!isLast && <div className="w-px flex-1 bg-gray-200" />}
                </div>
                <div className={isLast ? "" : "pb-6"}>
                  <div className="font-medium">{entry.status}</div>
                  <div className="mt-1 text-sm text-gray-500">
                    {entry.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
