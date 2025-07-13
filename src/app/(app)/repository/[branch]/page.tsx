import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {-
  Bot,
  Cpu,
  Wrench,
  Antenna,
  Network,
  Trowel,
} from "lucide-react";

const branchDetails: { [key: string]: { name: string; icon: React.ReactNode } } = {
  "ai-ds": { name: "AI & Data Science", icon: <Bot className="h-6 w-6" /> },
  "cs": { name: "Computer Science", icon: <Cpu className="h-6 w-6" /> },
  "mech": { name: "Mechanical", icon: <Wrench className="h-6 w-6" /> },
  "entc": { name: "Electronics & Telecommunication", icon: <Antenna className="h-6 w-6" /> },
  "it": { name: "Information Technology", icon: <Network className="h-6 w-6" /> },
  "civil": { name: "Civil", icon: <Trowel className="h-6 w-6" /> },
};

const years = [
  { name: "First Year (FE)", href: "fe" },
  { name: "Second Year (SE)", href: "se" },
  { name: "Third Year (TE)", href: "te" },
  { name: "Final Year (BE)", href: "be" },
];

export default function BranchPage({ params }: { params: { branch: string } }) {
    const branchInfo = branchDetails[params.branch] || { name: "Branch", icon: null };
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-2">
            {branchInfo.icon}
            <h1 className="text-3xl font-bold tracking-tight">{branchInfo.name}</h1>
        </div>
        <p className="text-muted-foreground">Select your year of study.</p>
      </div>
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {years.map((year) => (
          <Link key={year.href} href={`/repository/${params.branch}/${year.href}`}>
            <Card className="group hover:border-primary/80 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{year.name}</CardTitle>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
