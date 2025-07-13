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

    const history = input.messages.slice(0, -1).map((msg) => ({
      role: msg.role,
      content: [
        { text: msg.content.text },
        ...(msg.content.file?.dataUri
          ? [{ media: { url: msg.content.file.dataUri } }]
          : []),
      ],
    }));

    const lastMessage = input.messages[input.messages.length - 1];
    const prompt = [
        { text: lastMessage.content.text },
        ...(lastMessage.content.file?.dataUri
            ? [{ media: { url: lastMessage.content.file.dataUri } }]
            : []),
    ];

    const {output} = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      history,
      prompt,
    });

    const response = output?.text ?? '';
    if (!response) {
      // This is what triggers the error on the client.
      return { response: '' };
    }

    return {response};
  }
);
