
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, ArrowRight, Plus, X } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialSubjects = [
    { name: "Data Structures", href: "data-structures" },
    { name: "Algorithms", href: "algorithms" },
    { name: "Database Management", href: "dbms" },
    { name: "Operating Systems", href: "os" },
    { name: "Computer Networks", href: "cn" },
    { name: "Software Engineering", href: "se" },
];

export default function YearPage({ params }: { params: { branch: string, year: string } }) {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const branchName = params.branch.toUpperCase().replace('-', ' & ');
  const yearName = params.year.toUpperCase();

  const handleCreateFolder = () => {
    if (newFolderName.trim() === "") return;
    const newSubject = {
        name: newFolderName,
        href: newFolderName.toLowerCase().replace(/\s+/g, '-'),
    };
    setSubjects([...subjects, newSubject]);
    setNewFolderName("");
    setIsDialogOpen(false);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{branchName} - {yearName}</h1>
          <p className="text-muted-foreground">Select a subject or create a new folder.</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for your new subject folder. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Artificial Intelligence"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreateFolder}>Create Folder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
