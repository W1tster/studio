'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader, Wand2, Sparkles, AlertCircle } from 'lucide-react';
import { summarizeNotes } from '@/ai/flows/summarize-notes';
import { explainConcept } from '@/ai/flows/explain-concept';
import { generateQuestions } from '@/ai/flows/generate-questions';
import { useToast } from '@/hooks/use-toast';

type AiState = {
  loading: boolean;
  error: string | null;
  result: any | null;
};

export function AiAssistantClient() {
  const [summarizeState, setSummarizeState] = useState<AiState>({ loading: false, error: null, result: null });
  const [explainState, setExplainState] = useState<AiState>({ loading: false, error: null, result: null });
  const [questionState, setQuestionState] = useState<AiState>({ loading: false, error: null, result: null });

  const [notes, setNotes] = useState('');
  const [concept, setConcept] = useState('');
  const [topic, setTopic] = useState('');
  
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!notes) return;
    setSummarizeState({ loading: true, error: null, result: null });
    try {
      const result = await summarizeNotes({ notes });
      setSummarizeState({ loading: false, error: null, result });
    } catch (e) {
      console.error(e);
      const errorMsg = e instanceof Error ? e.message : 'An unknown error occurred.';
      setSummarizeState({ loading: false, error: errorMsg, result: null });
      toast({ variant: 'destructive', title: 'Error', description: errorMsg });
    }
  };

  const handleExplain = async () => {
    if (!concept) return;
    setExplainState({ loading: true, error: null, result: null });
    try {
      const result = await explainConcept({ concept });
      setExplainState({ loading: false, error: null, result });
    } catch (e) {
      console.error(e);
      const errorMsg = e instanceof Error ? e.message : 'An unknown error occurred.';
      setExplainState({ loading: false, error: errorMsg, result: null });
      toast({ variant: 'destructive', title: 'Error', description: errorMsg });
    }
  };

  const handleGenerateQuestions = async () => {
    if (!topic) return;
    setQuestionState({ loading: true, error: null, result: null });
    try {
      const result = await generateQuestions({ topic });
      setQuestionState({ loading: false, error: null, result });
    } catch (e) {
      console.error(e);
      const errorMsg = e instanceof Error ? e.message : 'An unknown error occurred.';
      setQuestionState({ loading: false, error: errorMsg, result: null });
      toast({ variant: 'destructive', title: 'Error', description: errorMsg });
    }
  };

  const renderResult = (state: AiState, title: string, renderContent: (result: any) => React.ReactNode) => {
    if (state.loading) {
      return (
        <Card className="mt-4">
          <CardContent className="p-6 flex items-center justify-center">
            <Loader className="mr-2 h-6 w-6 animate-spin" />
            <span className="text-muted-foreground">Generating...</span>
          </CardContent>
        </Card>
      );
    }
    if (state.error) {
       return (
        <Card className="mt-4 border-destructive">
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive"/>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{state.error}</p>
          </CardContent>
        </Card>
      );
    }
    if (state.result) {
      return (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-primary h-5 w-5" />
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none prose-p:leading-relaxed">
            {renderContent(state.result)}
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  return (
    <Tabs defaultValue="summarize">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="summarize">Summarize Notes</TabsTrigger>
        <TabsTrigger value="explain">Explain Concept</TabsTrigger>
        <TabsTrigger value="questions">Generate Questions</TabsTrigger>
      </TabsList>
      <TabsContent value="summarize">
        <Card>
          <CardHeader>
            <CardTitle>Summarize Notes</CardTitle>
            <CardDescription>Paste your notes below and the AI will generate a concise summary.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter your notes here..."
              className="min-h-[200px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button onClick={handleSummarize} disabled={summarizeState.loading || !notes}>
              <Wand2 className="mr-2 h-4 w-4" />
              {summarizeState.loading ? 'Summarizing...' : 'Summarize'}
            </Button>
          </CardContent>
        </Card>
        {renderResult(summarizeState, 'Summary', (result) => <p>{result.summary}</p>)}
      </TabsContent>
      <TabsContent value="explain">
        <Card>
          <CardHeader>
            <CardTitle>Explain a Concept</CardTitle>
            <CardDescription>Enter a difficult concept and get a simplified explanation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="e.g., Quantum Entanglement, Red-Black Trees"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
            />
            <Button onClick={handleExplain} disabled={explainState.loading || !concept}>
              <Wand2 className="mr-2 h-4 w-4" />
              {explainState.loading ? 'Explaining...' : 'Explain'}
            </Button>
          </CardContent>
        </Card>
        {renderResult(explainState, 'Explanation', (result) => <p>{result.explanation}</p>)}
      </TabsContent>
      <TabsContent value="questions">
        <Card>
          <CardHeader>
            <CardTitle>Generate Questions</CardTitle>
            <CardDescription>Enter a topic and the AI will generate practice questions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="e.g., The Krebs Cycle, Object-Oriented Programming"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <Button onClick={handleGenerateQuestions} disabled={questionState.loading || !topic}>
              <Wand2 className="mr-2 h-4 w-4" />
              {questionState.loading ? 'Generating...' : 'Generate'}
            </Button>
          </CardContent>
        </Card>
        {renderResult(questionState, 'Generated Questions', (result) => (
          <ul className="list-disc pl-5 space-y-2">
            {result.questions.map((q: string, i: number) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        ))}
      </TabsContent>
    </Tabs>
  );
}
