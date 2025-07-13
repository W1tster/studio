import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BrainCircuit, Library, MessagesSquare, Plus, FileText } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import Balancer from "react-wrap-balancer";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          <Balancer>Welcome back, Student!</Balancer>
        </h1>
        <p className="text-muted-foreground">
          <Balancer>Here's a quick overview of your study world.</Balancer>
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Library className="text-primary" />
              <span>Resource Repository</span>
            </CardTitle>
            <CardDescription>Browse notes, textbooks, and past papers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/repository">
              <Button variant="outline" className="w-full">
                Explore Repository <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessagesSquare className="text-primary" />
              <span>Student Forums</span>
            </CardTitle>
            <CardDescription>Ask questions and collaborate with peers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/forum">
              <Button variant="outline" className="w-full">
                Visit Forums <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="text-primary" />
              <span>Summarize Notes</span>
            </CardTitle>
            <CardDescription>Use AI to summarize your study notes.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/summarize">
              <Button variant="outline" className="w-full">
                Summarize Notes <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest uploads and discussions in your branches.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="font-medium">CS/SE/DSA - Quick Sort notes uploaded.</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                 <div className="flex items-center justify-between">
                    <p className="font-medium">Mech/TE/Thermo - New question in forum.</p>
                    <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
                 <div className="flex items-center justify-between">
                    <p className="font-medium">AI&DS/FE/Python - Textbook decode added.</p>
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Workspace</CardTitle>
             <CardDescription>Your personal collection of study materials.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <p className="font-medium">My Awesome Project Report.docx</p>
                     <Link href="/workspace">
                        <Button variant="ghost" size="sm">View</Button>
                     </Link>
                </div>
                 <div className="flex items-center justify-between">
                    <p className="font-medium">Calculus Cheatsheet.pdf</p>
                     <Link href="/workspace">
                        <Button variant="ghost" size="sm">View</Button>
                     </Link>
                </div>
                <Button className="w-full mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Workspace
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
