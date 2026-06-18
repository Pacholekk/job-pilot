import Dashboard from "@/components/Dasboard/Dashboard";
import PageHeader from "@/components/PageHeader/PageHeader";

const mockStats = [
  {
    label: "Total applications",
    value: 24,
    trend: "+3 this week",
    trendColor: "positive" as const,
  },
  {
    label: "Applied this week",
    value: 5,
    trend: "+2 vs last week",
    trendColor: "positive" as const,
  },
  {
    label: "Interviews",
    value: 3,
    trend: "1 upcoming",
    trendColor: "neutral" as const,
  },
  {
    label: "Response rate",
    value: "42%",
    trend: "+6%",
    trendColor: "positive" as const,
  },
];

const mockApplications = [
  {
    companyInitials: "ST",
    jobTitle: "Senior Frontend Engineer",
    companyName: "Stripe",
    status: "Interview" as const,
    score: 92,
  },
  {
    companyInitials: "VE",
    jobTitle: "Full Stack Engineer",
    companyName: "Vercel",
    status: "Applied" as const,
    score: 88,
  },
  {
    companyInitials: "LI",
    jobTitle: "Product Engineer",
    companyName: "Linear",
    status: "Screening" as const,
    score: 84,
  },
  {
    companyInitials: "FI",
    jobTitle: "Senior Frontend Engineer",
    companyName: "Figma",
    status: "Applied" as const,
    score: 81,
  },
  {
    companyInitials: "SU",
    jobTitle: "Developer Experience Engineer",
    companyName: "Supabase",
    status: "Interview" as const,
    score: 90,
  },
];

const mockStatusData = [
  { label: "Saved", count: 4, color: "#9ca3af" },
  { label: "Screening", count: 5, color: "#f97316" },
  { label: "Offer", count: 1, color: "#10b981" },
  { label: "Applied", count: 7, color: "#3b82f6" },
  { label: "Interview", count: 3, color: "#a855f7" },
  { label: "Rejected", count: 4, color: "#ef4444" },
];

const mockInsights = [
  "Stripe and Supabase roles have the highest match scores (90+).",
  "Follow up on Vercel and Figma applications — no response after 5 days.",
  "Most listings mention GraphQL and CI/CD — consider adding these to your profile.",
];

const mockOffers = [
  {
    companyInitials: "ST",
    companyName: "Stripe",
    jobTitle: "Senior Frontend Engineer",
    matchScore: 92,
    tags: ["React", "TypeScript", "Next.js"],
    salaryRange: "$180k–$220k",
    location: "Remote",
  },
  {
    companyInitials: "SU",
    companyName: "Supabase",
    jobTitle: "Developer Experience Engineer",
    matchScore: 90,
    tags: ["TypeScript", "Docs", "Open Source"],
    salaryRange: "$150k–$190k",
    location: "Remote",
  },
  {
    companyInitials: "VE",
    companyName: "Vercel",
    jobTitle: "Full Stack Engineer",
    matchScore: 88,
    tags: ["Next.js", "React", "Edge"],
    salaryRange: "$160k–$200k",
    location: "Remote",
  },
];

export default function Home() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Track your job search progress and AI insights."
      />
      <Dashboard
        stats={mockStats}
        recentApplications={mockApplications}
        statusData={mockStatusData}
        insights={mockInsights}
        offers={mockOffers}
      />
    </>
  );
}
