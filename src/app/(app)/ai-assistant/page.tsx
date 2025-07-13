import { AiAssistantClient } from "./ai-assistant-client";
import { Suspense } from "react";

function AiAssistantLoading() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">Your smart study partner, powered by Gemini.</p>
      </div>
      <div className="flex-grow overflow-hidden">
        {/* You can add a skeleton loader here if you want */}
      </div>
    </div>
  )
}

export default function AiAssistantPage() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">Your smart study partner, powered by Gemini.</p>
      </div>
      <div className="flex-grow overflow-hidden">
        <Suspense fallback={<AiAssistantLoading />}>
          <AiAssistantClient />
        </Suspense>
      </div>
    </div>
  );
}
