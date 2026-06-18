import OfferCard, { type OfferCardProps } from "./OfferCard/OfferCard";

export interface BestMatchingOffersProps {
  title?: string;
  subtitle?: string;
  offers: OfferCardProps[];
}

export default function BestMatchingOffers({
  title = "Best matching offers",
  subtitle = "Ranked by AI match score based on your profile and preferences.",
  offers,
}: BestMatchingOffersProps) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {offers.map((offer) => (
          <OfferCard
            key={`${offer.companyName}-${offer.jobTitle}`}
            {...offer}
          />
        ))}
      </div>
    </section>
  );
}
