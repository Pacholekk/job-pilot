"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseIcon,
  LayoutDashboardIcon,
  PlusIcon,
  PlaneIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/applications", label: "Applications", icon: BriefcaseIcon },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <PlaneIcon className="size-4" />
        </span>
        <span className="text-base font-semibold tracking-tight">JobPilot</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        <span className="px-2 pb-1 pt-2 text-xs font-medium tracking-wide text-muted-foreground">
          MENU
        </span>
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}

        <Button asChild className="mt-3 justify-start gap-2">
          <Link href="/applications/new">
            <PlusIcon className="size-4" />
            Add Application
          </Link>
        </Button>
      </nav>
    </aside>
  );
}
