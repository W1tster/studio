import { Suspense } from "react";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

const AiAssistantClient = dynamic(() => 
  import("./ai-assistant-client").then((mod) => mod.AiAssistantClient),
  { ssr: false, loading: () => <AiAssistantLoading /> }
);


function AiAssistantLoading() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">Your smart study partner, powered by Gemini.</p>
      </div>
      <div className="flex-grow overflow-hidden flex flex-col">
         <div className="flex-grow space-y-4 p-6">
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-16 w-3/4 ml-auto" />
            <Skeleton className="h-24 w-4/5" />
         </div>
         <div className="p-4 border-t">
            <Skeleton className="h-12 w-full" />
         </div>
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
