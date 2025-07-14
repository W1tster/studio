
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Wand2, AlertCircle, Paperclip, X } from 'lucide-react';
import { summarizeNotes } from '@/ai/flows/summarize-notes';
import { useToast } from '@/hooks/use-toast';
import { fileToDataURI } from '@/lib/file-utils';

export function SummarizeClient() {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSummarize = async () => {
    if (!notes.trim() && !file) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter some notes or upload a file to summarize.',
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary('');

    try {
      let fileDataUri: string | undefined;
      if (file) {
        fileDataUri = await fileToDataURI(file);
      }

      const result = await summarizeNotes({ notes, fileDataUri });
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
        <div className="flex-grow flex flex-col gap-4">
            <Textarea
            placeholder="Paste your notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="flex-grow min-h-[300px] text-base"
            disabled={isLoading}
            />
            
            <div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    id="attachment"
                />
                {!file ? (
                    <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                    >
                        <Paperclip className="mr-2 h-4 w-4" />
                        Upload File (Image or Text)
                    </Button>
                ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 border rounded-md bg-muted/50">
                        <Paperclip className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{file.name}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto" onClick={() => setFile(null)} disabled={isLoading}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>

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
