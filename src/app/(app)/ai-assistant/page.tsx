import { AiAssistantClient } from "./ai-assistant-client";

export default function AiAssistantPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">Your smart study partner, powered by Gemini.</p>
      </div>
      <AiAssistantClient />
    </div>
  );
}
