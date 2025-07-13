'use server';

/**
 * @fileOverview A general-purpose chat flow for the AI assistant.
 *
 * - chat - A function that takes a user's message and conversation history to generate a response.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const MessageContentSchema = z.object({
  text: z.string(),
  file: z
    .object({
      name: z.string(),
      type: z.string(),
      dataUri: z.string().describe("A data URI with a MIME type and Base64 encoding. Format: 'data:<mimetype>;base64,<encoded_data>'."),
    })
    .optional(),
});

export const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: MessageContentSchema,
});
export type Message = z.infer<typeof MessageSchema>;

export const ChatInputSchema = z.object({
  messages: z.array(MessageSchema),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  response: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;


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
    const history = allMessages.slice(0, -1).map(msg => {
      // Genkit history does not currently support media parts in the same way as the prompt.
      // We only include text from previous messages.
      return {
        role: msg.role,
        content: [{ text: msg.content.text }]
      }
    });

    // The prompt contains only the parts of the new user's message.
    const promptParts = [];
    if (lastUserMessage.content.text) {
      promptParts.push({ text: lastUserMessage.content.text });
    }
    if (lastUserMessage.content.file?.dataUri) {
      promptParts.push({ media: { url: lastUserMessage.content.file.dataUri } });
    }

    const { output } = await ai.generate({
        model: 'googleai/gemini-1.5-flash',
        history,
        prompt: promptParts,
    });

    return { response: output?.text ?? '' };
  }
);
