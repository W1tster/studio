'use server';

/**
 * @fileOverview A general-purpose chat flow for the AI assistant.
 *
 * - chat - A function that takes a user's message and conversation history to generate a response.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { ChatInput, ChatOutput, Message } from './chat.d';

const MessageContentSchema = z.object({
    text: z.string(),
    file: z.object({
        name: z.string(),
        type: z.string(),
        dataUri: z.string().describe("A data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
    }).optional(),
});

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: MessageContentSchema
});

const ChatInputSchema = z.object({
  messages: z.array(MessageSchema),
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
    
    if (input.messages.length === 0) {
        return { response: "Hello! How can I help you today?" };
    }

    const allMessages = input.messages;
    const lastUserMessage = allMessages[allMessages.length - 1];

    // The history contains all messages EXCEPT the last one.
    const history = allMessages.slice(0, -1).map(msg => ({
        role: msg.role,
        content: [{ text: msg.content.text }] // Note: Genkit history does not currently support media parts in the same way as the prompt.
    }));

    // The prompt contains only the new parts of the user's message.
    const promptParts = [];
    if (lastUserMessage.content.text) {
      promptParts.push({ text: lastUserMessage.content.text });
    }
    if (lastUserMessage.content.file?.dataUri) {
      promptParts.push({ media: { url: lastUserMessage.content.file.dataUri } });
    }

    const { output } = await ai.generate({
        history,
        prompt: promptParts,
        model: 'googleai/gemini-1.5-flash'
    });

    return { response: output?.text ?? '' };
  }
);
