import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MessageSquare, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";

const posts = [
    { id: '1', title: "Doubts about Asymptotic Notation in Algorithms", author: "Priya S.", authorInitials: "PS", replies: 12, votes: 45, branch: "CS", year: "SE" },
    { id: '2', title: "Best resources for learning Thermodynamics?", author: "Rohan M.", authorInitials: "RM", replies: 8, votes: 32, branch: "Mechanical", year: "TE" },
    { id: '3', title: "Internship opportunities for AI/DS students", author: "Aisha K.", authorInitials: "AK", replies: 23, votes: 89, branch: "AI&DS", year: "TE" },
    { id: '4', title: "How to prepare for the final year project?", author: "Vikram R.", authorInitials: "VR", replies: 5, votes: 18, branch: "IT", year: "BE" },
];

export default function ForumPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Forums</h1>
          <p className="text-muted-foreground">Ask questions, share knowledge, and connect with peers.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
            <Link key={post.id} href={`/forum/${post.id}`} className="block">
                <Card className="hover:border-primary/80 transition-colors">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="flex flex-col items-center gap-1 p-2 rounded-md bg-muted/50">
                            <ArrowUp className="h-5 w-5 hover:text-primary cursor-pointer"/>
                            <span className="font-bold text-lg">{post.votes}</span>
                            <ArrowDown className="h-5 w-5 hover:text-destructive cursor-pointer"/>
                        </div>
                        <div className="flex-grow">
                             <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <span className="font-semibold text-primary/90">{post.branch}</span>
                                <span>/</span>
                                <span>{post.year}</span>
                            </div>
                            <h3 className="font-semibold text-lg text-foreground">{post.title}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={`https://placehold.co/32x32.png`} />
                                        <AvatarFallback>{post.authorInitials}</AvatarFallback>
                                    </Avatar>
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{post.replies} replies</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
    </div>
  );
}
