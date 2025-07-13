'use server';

/**
 * @fileOverview A general-purpose chat flow for the AI assistant.
 *
 * - chat - A function that takes a user's message and conversation history to generate a response.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { ChatInput, ChatOutput } from './chat.d';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(z.object({
    text: z.string().optional(),
    media: z.object({
      url: z.string().describe("A data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
      contentType: z.string().optional(),
    }).optional(),
  })),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
  message: z.string().describe('The user\'s message.'),
  fileDataUri: z.string().optional().describe("An optional file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});


const ChatOutputSchema = z.object({
  response: z.string().describe('The AI\'s response.'),
});

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
    
    const history = input.history.map(h => ({
      role: h.role,
      content: h.content,
    }));

    const promptParts: any[] = [{ text: input.message }];
    if (input.fileDataUri) {
        promptParts.push({ media: { url: input.fileDataUri } });
    }

    const { output } = await ai.generate({
        history,
        prompt: promptParts,
        config: {
            // Use a more capable model for general chat
            model: 'googleai/gemini-1.5-flash'
        }
    });

    return { response: output!.text! };
  }
);
