import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ItemsList, { type ItemsListProps } from "./ItemsList/ItemsList";
import { AwardIcon } from "lucide-react";

export interface ItemsSectionProps extends ItemsListProps {
  title: string;
  actionLabel?: string;
}

export default function ItemsSection({
  title,
  actionLabel = "View all",
  items,
}: ItemsSectionProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm">
            {actionLabel}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <ItemsList items={items} />
      </CardContent>
    </Card>
  );
}
