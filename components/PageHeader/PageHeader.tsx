import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

export interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="flex w-full items-center justify-between gap-4 border-b border-border px-6 py-5">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button asChild className="gap-2">
        <Link href="/applications/new">
          <PlusIcon className="size-4" />
          Add Application
        </Link>
      </Button>
    </header>
  );
}
