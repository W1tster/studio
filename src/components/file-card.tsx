'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  ArrowUp,
  ArrowDown,
  Download,
  MoreVertical,
  Flag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface FileCardProps {
  name: string;
  type: string;
  uploader: string;
  uploadDate: string;
  votes: number;
}

export function FileCard({
  name,
  type,
  uploader,
  uploadDate,
  votes: initialVotes,
}: FileCardProps) {
  const [votes, setVotes] = useState(initialVotes);

  const handleVote = (amount: number) => {
    setVotes(currentVotes => currentVotes + amount);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription>Type: {type}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Flag className="mr-2 h-4 w-4" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">
          Uploaded by {uploader} on {uploadDate}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-muted/50 p-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleVote(1)}>
            <ArrowUp className="h-5 w-5" />
          </Button>
          <span className="font-bold text-lg">{votes}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleVote(-1)}>
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
