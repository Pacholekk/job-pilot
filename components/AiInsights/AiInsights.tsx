import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface AiInsightsProps {
  title?: string;
  insights: string[];
}

export default function AiInsights({
  title = "AI insights",
  insights,
}: AiInsightsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex list-disc flex-col gap-2 pl-4 text-sm text-muted-foreground">
          {insights.map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
