"use client";

import { MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import Link from "next/link";

interface ApplicationRowActionsProps {
  applicationId: number;
}

export default function ApplicationRowActions({
  applicationId,
}: ApplicationRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
        >
          <MoreVerticalIcon className="size-4" />
          <span className="sr-only">
            Open menu for application {applicationId}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/applications/edit/${applicationId}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
