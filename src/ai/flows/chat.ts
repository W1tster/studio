'use server';

/**
 * @fileOverview A general-purpose chat flow for the AI assistant.
 *
 * - chat - A function that takes a user's message and conversation history to generate a response.
 */

import {ai} from '@/ai/genkit';
import {
  ChatInput,
  ChatInputSchema,
  ChatOutput,
  ChatOutputSchema,
} from './chat-types';
import type {Message} from './chat-types';

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    if (input.messages.length === 0) {
      return {response: 'Hello! How can I help you today?'};
    }

    // Convert our message format to the Genkit history format.
    // The history is every message except the last one.
    const history: {role: 'user' | 'model'; content: Array<{text: string} | {media: {url: string}}>}[] = input.messages
      .slice(0, -1)
      .map((msg: Message) => {
        const content: Array<{text: string} | {media: {url: string}}> = [{ text: msg.content.text }];
        if (msg.content.file?.dataUri) {
          content.push({ media: { url: msg.content.file.dataUri } });
        }
        return {
          role: msg.role,
          content,
        };
      });

    // The prompt is the content of the last message.
    const lastMessage = input.messages[input.messages.length - 1];
    const prompt: Array<{text: string} | {media: {url: string}}> = [{ text: lastMessage.content.text }];
    if (lastMessage.content.file?.dataUri) {
        prompt.push({ media: { url: lastMessage.content.file.dataUri } });
    }

    const {output} = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      history,
      prompt,
    });
    
    const response = output?.text ?? '';

    return {response};
  }
);
