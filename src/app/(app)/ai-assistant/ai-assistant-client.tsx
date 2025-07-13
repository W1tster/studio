'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Send, Paperclip, X, User, Sparkles, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { chat } from '@/ai/flows/chat';
import { type ChatInput } from '@/ai/flows/chat.d';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  role: 'user' | 'model';
  content: string;
  file?: {
    name: string;
    type: string;
    dataUri: string;
  };
};

type ContentPart = ChatInput['history'][number]['content'][number];

export function AiAssistantClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload a file smaller than 2MB.',
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !file) return;

    setError(null);
    setIsLoading(true);

    let fileDataUri: string | undefined;
    let userMessageContent = input;

    if (file) {
      userMessageContent += `\n\nAttached file: ${file.name}`;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      await new Promise<void>((resolve, reject) => {
        reader.onload = () => {
          fileDataUri = reader.result as string;
          resolve();
        };
        reader.onerror = (error) => reject(error);
      });
    }
    
    const newUserMessage: Message = {
      role: 'user',
      content: userMessageContent,
      ...(file && { file: { name: file.name, type: file.type, dataUri: fileDataUri! } }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setFile(null);

    const historyForApi: ChatInput['history'] = messages.map((msg) => {
        const content: ContentPart[] = [{ text: msg.content }];
        if (msg.file?.dataUri) {
            content.push({ media: { url: msg.file.dataUri, contentType: msg.file.type } });
        }
        return { role: msg.role, content };
    });

    try {
      const result = await chat({
        history: historyForApi,
        message: input,
        fileDataUri,
      });

      const assistantMessage: Message = {
        role: 'model',
        content: result.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      console.error(e);
      const errorMsg = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMsg);
      toast({ variant: 'destructive', title: 'Error', description: errorMsg });
      // Restore user message on error
      setMessages(prev => prev.slice(0, -1));
      setInput(newUserMessage.content);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col" style={{maxHeight: 'calc(100vh - 10rem)'}}>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-6 space-y-6">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground">
                <Sparkles className="mx-auto h-12 w-12" />
                <h2 className="mt-2 text-xl font-semibold">Start the Conversation</h2>
                <p>Ask a question, paste some text to summarize, or upload a file.</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'model' && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarFallback><Sparkles className="w-5 h-5 text-primary" /></AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[75%] rounded-lg px-4 py-3 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarFallback><User className="w-5 h-5" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback><Sparkles className="w-5 h-5 text-primary" /></AvatarFallback>
                </Avatar>
                <div className="max-w-[75%] rounded-lg px-4 py-3 bg-muted flex items-center">
                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                    <span>Thinking...</span>
                </div>
              </div>
            )}
            {error && (
                 <Card className="mt-4 border-destructive">
                    <CardHeader className="flex flex-row items-center gap-2 p-4">
                        <AlertCircle className="h-5 w-5 text-destructive"/>
                        <h3 className="text-destructive font-semibold">Error</h3>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <p>{error}</p>
                    </CardContent>
                </Card>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t bg-card">
        <div className="flex w-full items-center space-x-2 relative">
           <Textarea
            placeholder="Type your message or ask a question..."
            className="resize-none pr-24 min-h-[52px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button
                size="icon"
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                aria-label="Attach file"
              >
              <Paperclip className="h-5 w-5" />
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

            <Button onClick={handleSendMessage} disabled={isLoading || (!input.trim() && !file)} size="icon" aria-label="Send message">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {file && (
          <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2 bg-muted p-2 rounded-md">
            <Paperclip className="h-4 w-4" />
            <span>{file.name}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setFile(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
