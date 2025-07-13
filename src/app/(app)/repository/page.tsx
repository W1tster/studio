import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Cpu, Wrench, Antenna, Network, Hammer } from "lucide-react";
import Link from "next/link";
import React from "react";

const branches = [
  { name: "AI & Data Science", href: "ai-ds", icon: <Bot className="h-8 w-8 text-primary" /> },
  { name: "Computer Science", href: "cs", icon: <Cpu className="h-8 w-8 text-primary" /> },
  { name: "Mechanical", href: "mech", icon: <Wrench className="h-8 w-8 text-primary" /> },
  { name: "Electronics & Telecommunication", href: "entc", icon: <Antenna className="h-8 w-8 text-primary" /> },
  { name: "Information Technology", href: "it", icon: <Network className="h-8 w-8 text-primary" /> },
  { name: "Civil", href: "civil", icon: <Hammer className="h-8 w-8 text-primary" /> },
];

export default function RepositoryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resource Repository</h1>
        <p className="text-muted-foreground">Select your engineering branch to find study materials.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {branches.map((branch) => (
          <Link key={branch.href} href={`/repository/${branch.href}`}>
            <Card className="group hover:border-primary/80 transition-colors h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  {branch.icon}
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                <CardTitle className="text-xl font-semibold">{branch.name}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
