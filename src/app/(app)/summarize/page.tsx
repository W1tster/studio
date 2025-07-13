import { SummarizeClient } from './summarize-client';

export default function SummarizePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Summarize Notes</h1>
        <p className="text-muted-foreground">
          Paste your notes below and let AI create a concise summary for you.
        </p>
      </div>
      <SummarizeClient />
    </div>
  );
}
