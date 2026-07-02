import Dashboard from "@/components/Dasboard/Dashboard";
import PageHeader from "@/components/PageHeader/PageHeader";
import { getDashboardStats } from "@/lib/dashboard/get-stats";

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

export default async function Home() {
  const dashboardStats = await getDashboardStats();
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Track your job search progress and AI insights."
      />
      <Dashboard stats={dashboardStats} insights={mockInsights} />
    </>
  );
}
