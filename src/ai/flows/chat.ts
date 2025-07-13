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
  async input => {
    if (input.messages.length === 0) {
      return {response: 'Hello! How can I help you today?'};
    }

    const allMessages = input.messages;
    const lastUserMessage = allMessages[allMessages.length - 1];

    // The history contains all messages EXCEPT the last one.
    const history = allMessages.slice(0, -1).map(msg => ({
      role: msg.role,
      content: [{text: msg.content.text}], // File content from history is ignored for simplicity
    }));

    // The prompt contains only the parts of the new user's message.
    const promptParts = [];
    if (lastUserMessage.content.text) {
      promptParts.push({text: lastUserMessage.content.text});
    }
    if (lastUserMessage.content.file?.dataUri) {
      promptParts.push({
        media: {url: lastUserMessage.content.file.dataUri},
      });
    }
    
    if (promptParts.length === 0) {
      // Should not happen if client validates, but as a safeguard.
      return { response: "I didn't receive a message. Please try again." };
    }

    const {output} = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      history,
      prompt: promptParts,
    });

    const response = output?.text ?? '';
    if (!response) {
      // This is what triggers the error on the client.
      return { response: '' };
    }

    return {response};
  }
);
