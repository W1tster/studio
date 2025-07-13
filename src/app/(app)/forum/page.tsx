'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MessageSquare, ArrowUp, ArrowDown } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initialPosts = [
    { id: '1', title: "Doubts about Asymptotic Notation in Algorithms", author: "Priya S.", authorInitials: "PS", replies: 12, votes: 45, branch: "CS", year: "SE" },
    { id: '2', title: "Best resources for learning Thermodynamics?", author: "Rohan M.", authorInitials: "RM", replies: 8, votes: 32, branch: "Mechanical", year: "TE" },
    { id: '3', title: "Internship opportunities for AI/DS students", author: "Aisha K.", authorInitials: "AK", replies: 23, votes: 89, branch: "AI&DS", year: "TE" },
    { id: '4', title: "How to prepare for the final year project?", author: "Vikram R.", authorInitials: "VR", replies: 5, votes: 18, branch: "IT", year: "BE" },
];

export default function ForumPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  const handleCreatePost = () => {
    if (newPostTitle.trim() === "" || newPostContent.trim() === "") return;

    const newPost = {
      id: (posts.length + 1).toString(),
      title: newPostTitle,
      author: "Student",
      authorInitials: "S",
      replies: 0,
      votes: 0,
      branch: "General",
      year: "FE",
      content: newPostContent,
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Forums</h1>
          <p className="text-muted-foreground">Ask questions, share knowledge, and connect with peers.</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
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

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create a New Post</DialogTitle>
            <DialogDescription>
              Share your question or knowledge with the community.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="col-span-3"
                placeholder="e.g., How does photosynthesis work?"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Content
              </Label>
              <Textarea
                id="content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="col-span-3 min-h-[120px]"
                placeholder="Elaborate on your question or topic here."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleCreatePost}>Create Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
