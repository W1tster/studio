'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

function AiAssistantLoading() {
  return (
    <div className="flex flex-col gap-4 h-full" style={{maxHeight: 'calc(100vh - 10rem)'}}>
      <div className="flex-grow overflow-hidden flex flex-col">
         <div className="flex-grow space-y-4 p-6">
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-16 w-3/4 ml-auto" />
            <Skeleton className="h-24 w-4/5" />
         </div>
         <div className="p-4 border-t bg-card">
            <Skeleton className="h-12 w-full" />
         </div>
      </div>
    </div>
  )
}

const AiAssistantClient = dynamic(() => 
  import("./ai-assistant-client").then((mod) => mod.AiAssistantClient),
  { ssr: false, loading: () => <AiAssistantLoading /> }
);

// This component simply wraps the AiAssistantClient to allow for dynamic, client-side loading.
export function AiAssistantLoader() {
    return <AiAssistantClient />;
}
