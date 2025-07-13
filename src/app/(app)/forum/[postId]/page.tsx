'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, ArrowDown, Paperclip } from "lucide-react";
import { cn } from '@/lib/utils';

const initialPost = {
    id: '1', 
    title: "Doubts about Asymptotic Notation in Algorithms", 
    author: "Priya S.", 
    authorInitials: "PS",
    date: "May 10, 2024",
    content: "Hi everyone, I'm having trouble understanding the difference between Big-O, Big-Omega, and Big-Theta notation. Can someone explain it in simple terms with an example? The textbook is a bit confusing.",
    votes: 45,
    userVote: 0,
    branch: "CS", 
    year: "SE",
    attachment: "asymptotic_notation_questions.pdf"
};

const initialReplies = [
    { id: 1, author: "Ben C.", authorInitials: "BC", date: "May 10, 2024", content: "Think of it like this: Big-O is the upper bound (worst case), Big-Omega is the lower bound (best case), and Big-Theta is the tight bound (average case). For an array search, worst case (Big-O) is finding it at the end, O(n). Best case (Big-Omega) is finding it at the start, Ω(1).", votes: 28, userVote: 0 },
    { id: 2, author: "Rohan M.", authorInitials: "RM", date: "May 11, 2024", content: "Great explanation, Ben! To add on, Big-Theta is only used when the best and worst cases are the same. For example, accessing an element in an array by its index is always Θ(1) because it takes the same amount of time regardless of the index.", votes: 15, userVote: 0 },
];

export default function PostDetailPage({ params }: { params: { postId: string } }) {
  // In a real app, you would fetch the post details based on params.postId
  const [post, setPost] = useState(initialPost);
  const [replies, setReplies] = useState(initialReplies);

  const handlePostVote = (voteType: 'up' | 'down') => {
    const voteValue = voteType === 'up' ? 1 : -1;
    setPost(currentPost => {
      let newVoteCount = currentPost.votes;
      let newUserVote = currentPost.userVote;

      if (newUserVote === voteValue) {
        // Undo vote
        newVoteCount -= voteValue;
        newUserVote = 0;
      } else {
        // New or changing vote
        if (newUserVote !== 0) {
          newVoteCount -= newUserVote; // Undo previous vote
        }
        newVoteCount += voteValue; // Apply new vote
        newUserVote = voteValue;
      }
      return {...currentPost, votes: newVoteCount, userVote: newUserVote };
    });
  };

  const handleReplyVote = (replyId: number, voteType: 'up' | 'down') => {
    const voteValue = voteType === 'up' ? 1 : -1;
    setReplies(currentReplies => 
      currentReplies.map(reply => {
        if (reply.id === replyId) {
          let newVoteCount = reply.votes;
          let newUserVote = reply.userVote;

          if (newUserVote === voteValue) {
            newVoteCount -= voteValue;
            newUserVote = 0;
          } else {
            if (newUserVote !== 0) {
              newVoteCount -= newUserVote;
            }
            newVoteCount += voteValue;
            newUserVote = voteValue;
          }
          return { ...reply, votes: newVoteCount, userVote: newUserVote };
        }
        return reply;
      })
    );
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <Card>
            <CardHeader>
                <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={`https://placehold.co/32x32.png`} />
                        <AvatarFallback>{post.authorInitials}</AvatarFallback>
                    </Avatar>
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                </div>
            </CardHeader>
            <CardContent>
                <p className="leading-relaxed">{post.content}</p>
                {post.attachment && (
                    <div className="mt-4">
                        <Button variant="outline" size="sm" asChild>
                            <a href="#" download>
                                <Paperclip className="mr-2 h-4 w-4" />
                                {post.attachment}
                            </a>
                        </Button>
                    </div>
                )}
                 <div className="flex items-center gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={cn("gap-2", post.userVote === 1 && "border-primary text-primary")} 
                      onClick={() => handlePostVote('up')}
                    > 
                      <ArrowUp className="h-4 w-4" /> Upvote 
                    </Button>
                     <Button 
                      variant="outline" 
                      size="sm" 
                      className={cn("gap-2", post.userVote === -1 && "border-destructive text-destructive")} 
                      onClick={() => handlePostVote('down')}
                    > 
                      <ArrowDown className="h-4 w-4" /> Downvote
                    </Button>
                    <span className="font-bold">{post.votes}</span>
                </div>
            </CardContent>
        </Card>

        <Separator />

        <h2 className="text-2xl font-bold">Replies ({replies.length})</h2>

        <div className="flex flex-col gap-4">
            {replies.map((reply) => (
                <Card key={reply.id} className="bg-card/50">
                    <CardContent className="p-4 flex items-start gap-4">
                         <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground pt-1">
                            <ArrowUp 
                              className={cn("h-5 w-5 hover:text-primary cursor-pointer", reply.userVote === 1 && "text-primary")}
                              onClick={() => handleReplyVote(reply.id, 'up')}
                            />
                            <span className="font-bold text-base text-foreground">{reply.votes}</span>
                            <ArrowDown 
                              className={cn("h-5 w-5 hover:text-destructive cursor-pointer", reply.userVote === -1 && "text-destructive")}
                              onClick={() => handleReplyVote(reply.id, 'down')}
                            />
                        </div>
                        <div className="flex-grow">
                             <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={`https://placehold.co/32x32.png`}/>
                                    <AvatarFallback>{reply.authorInitials}</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold text-foreground">{reply.author}</span>
                                <span>•</span>
                                <span>{reply.date}</span>
                            </div>
                            <p className="text-foreground/90">{reply.content}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
        
        <Card>
            <CardHeader>
                <h3 className="text-lg font-semibold">Your Answer</h3>
            </CardHeader>
            <CardContent>
                <Textarea placeholder="Type your answer here." className="min-h-[120px]" />
                <Button className="mt-4">Post Reply</Button>
            </CardContent>
        </Card>

    </div>
  );
}
