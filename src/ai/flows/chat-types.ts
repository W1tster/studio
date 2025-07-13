import {z} from 'genkit';

export const MessageContentSchema = z.object({
  text: z.string(),
  file: z
    .object({
      name: z.string(),
      type: z.string(),
      dataUri: z
        .string()
        .describe(
          "A data URI with a MIME type and Base64 encoding. Format: 'data:<mimetype>;base64,<encoded_data>'"
        ),
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
