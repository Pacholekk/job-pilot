import Link from "next/link";
import { Button } from "../ui/button";

export interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex w-full justify-between border-b-1  p-5">
      <div className="flex flex-col ml-4 ">
        <span>{title} </span>
        <span>{description} </span>
      </div>
      <div className="flex  mr-4 items-center gap-3 ">
        <Button>x</Button>
        <Button asChild>
          <Link href="/applications/new">+ Add Application </Link>
        </Button>
      </div>
    </div>
  );
}
