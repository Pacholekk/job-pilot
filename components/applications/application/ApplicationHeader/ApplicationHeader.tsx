import { ApplicationStatus } from "@/components/ItemsSection/ItemsList/Item/Item";
import { JobType } from "@/lib/generated/prisma/enums";

type ApplicationBadges = ApplicationStatus | JobType | undefined;
interface ApplicationHeaderProps {
  title?: string;
  description?: string;
  badges?: ApplicationBadges[];
}

export default function ApplicationHeader({
  title,
  description,
  badges,
}: ApplicationHeaderProps) {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div>
        {badges?.map((badge) => (
          <div key={badge}>{badge}</div>
        ))}
      </div>
    </div>
  );
}
