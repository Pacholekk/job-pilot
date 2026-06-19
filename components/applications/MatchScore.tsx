import { cn } from "@/lib/utils";

interface MatchScoreProps {
  score: number;
  className?: string;
}

function getScoreColor(score: number) {
  if (score >= 80) return { stroke: "#10b981", text: "text-emerald-600" };
  if (score >= 60) return { stroke: "#f97316", text: "text-orange-500" };
  return { stroke: "#ef4444", text: "text-red-500" };
}

export default function MatchScore({ score, className }: MatchScoreProps) {
  const size = 40;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const { stroke, text } = getScoreColor(score);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/60"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className={cn("absolute text-xs font-semibold", text)}>{score}</span>
    </div>
  );
}
