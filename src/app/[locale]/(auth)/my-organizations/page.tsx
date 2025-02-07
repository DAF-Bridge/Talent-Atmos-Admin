import { Button } from "@/components/ui/button";
import OrganizationCard from "@/features/organization/components/organization-card";
import { Link } from "@/i18n/routing";
import { Plus } from "lucide-react";

interface Organization {
  id: number;
  name: string;
  description: string;
  members: number;
  eventCount: number;
  openJobCount: number;
  imageUrl?: string;
}

const organizations: Organization[] = [
  {
    id: 1,
    name: "Tech Innovators",
    description:
      "Driving technological advancements in various sectors, from AI to renewable energy solutions.",
    members: 150,
    eventCount: 5,
    openJobCount: 3,
    imageUrl: "/tech-innovators.jpg",
  },
  {
    id: 2,
    name: "Green Earth Initiative",
    description:
      "Promoting environmental sustainability through community engagement and innovative green technologies.",
    members: 300,
    eventCount: 8,
    openJobCount: 2,
  },
  {
    id: 3,
    name: "Community Builders",
    description:
      "Creating stronger local communities through volunteer programs and neighborhood improvement projects.",
    members: 200,
    eventCount: 6,
    openJobCount: 4,
    imageUrl: "/community-builders.jpg",
  },
  {
    id: 4,
    name: "Education for All",
    description:
      "Ensuring access to quality education for underprivileged children and adults worldwide.",
    members: 250,
    eventCount: 7,
    openJobCount: 1,
    imageUrl: "/education-for-all.jpg",
  },
];

export default function MyOrganizations() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">My Organizations</h1>
        <Link href={"/org-register"}>
          <Button className="mb-8">
            <Plus size={24} />
            <span className="hidden sm:inline">Create Organization</span>
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {organizations.map((org) => (
          <OrganizationCard key={org.id} organization={org} />
        ))}
      </div>
    </div>
  );
}
