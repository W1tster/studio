'use server';

/**
 * @fileOverview A general-purpose chat flow for the AI assistant.
 *
 * - chat - A function that takes a user's message and conversation history to generate a response.
 */

import {ai} from '@/ai/genkit';
import { ChatInput, ChatInputSchema, ChatOutputSchema } from './chat.d';

export async function chat(input: ChatInput): Promise<{ response: string; }> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    
    const history = input.history.map(h => ({
      role: h.role,
      content: h.content.map(c => {
        if (c.text) return { text: c.text };
        if (c.media) return { media: { url: c.media.url, contentType: c.media.contentType } };
        return {};
      })
    }));

    const promptParts: any[] = [{ text: input.message }];
    if (input.fileDataUri) {
        promptParts.push({ media: { url: input.fileDataUri } });
    }

    const { output } = await ai.generate({
        history,
        prompt: {
            role: 'user',
            content: promptParts
        },
        config: {
            // Use a more capable model for general chat
            model: 'googleai/gemini-1.5-flash'
        }
    });

    return { response: output!.text! };
  }
);
