'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Wand2, AlertCircle } from 'lucide-react';
import { summarizeNotes } from '@/ai/flows/summarize-notes';
import { useToast } from '@/hooks/use-toast';

export function SummarizeClient() {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!notes.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter some notes to summarize.',
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary('');

    try {
      const result = await summarizeNotes({ notes });
      if (result.summary) {
        setSummary(result.summary);
      } else {
        throw new Error('Failed to generate summary.');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Summarization Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-4">
        <Textarea
          placeholder="Paste your notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="h-full min-h-[400px] text-base"
          disabled={isLoading}
        />
        <Button onClick={handleSummarize} disabled={isLoading} size="lg">
          {isLoading ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" />
              Summarizing...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-5 w-5" />
              Summarize
            </>
          )}
        </Button>
      </div>
      <div className="flex flex-col">
        <Card className="h-full min-h-[400px]">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <Loader className="h-8 w-8 animate-spin" />
              </div>
            )}
            {error && (
              <div className="text-destructive flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}
            {summary && (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-base whitespace-pre-wrap">{summary}</p>
              </div>
            )}
            {!isLoading && !summary && !error && (
              <p className="text-muted-foreground">
                Your summary will appear here once it's generated.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
