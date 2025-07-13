import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

const subjects = [
    { name: "Data Structures", href: "data-structures" },
    { name: "Algorithms", href: "algorithms" },
    { name: "Database Management", href: "dbms" },
    { name: "Operating Systems", href: "os" },
    { name: "Computer Networks", href: "cn" },
    { name: "Software Engineering", href: "se" },
];

export default function YearPage({ params }: { params: { branch: string, year: string } }) {
  const branchName = params.branch.toUpperCase().replace('-', ' & ');
  const yearName = params.year.toUpperCase();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{branchName} - {yearName}</h1>
          <p className="text-muted-foreground">Select a subject or create a new folder.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Folder
        </Button>
      </div>
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subjects.map((subject) => (
          <Link key={subject.href} href={`/repository/${params.branch}/${params.year}/${subject.href}`}>
            <Card className="group hover:border-primary/80 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                    <Folder className="h-6 w-6 text-primary" />
                    <CardTitle>{subject.name}</CardTitle>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
