'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing notes.
 *
 * - summarizeNotes - A function that accepts notes and returns a summary.
 * - SummarizeNotesInput - The input type for the summarizeNotes function.
 * - SummarizeNotesOutput - The return type for the summarizeNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeNotesInputSchema = z.object({
  notes: z.string().optional().describe('The notes to be summarized.'),
  fileDataUri: z
    .string()
    .optional()
    .describe(
      "A file containing notes (e.g., an image or text document), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizeNotesInput = z.infer<typeof SummarizeNotesInputSchema>;

const SummarizeNotesOutputSchema = z.object({
  summary: z.string().describe('The summary of the notes.'),
});
export type SummarizeNotesOutput = z.infer<typeof SummarizeNotesOutputSchema>;

export async function summarizeNotes(
  input: SummarizeNotesInput
): Promise<SummarizeNotesOutput> {
  return summarizeNotesFlow(input);
}

const summarizeNotesPrompt = ai.definePrompt({
  name: 'summarizeNotesPrompt',
  input: {schema: SummarizeNotesInputSchema},
  output: {schema: SummarizeNotesOutputSchema},
  prompt: `You are an expert at summarizing notes. Summarize the following content. If there is both text and a file, consider them together.

  {{#if notes}}
  Text Content:
  {{{notes}}}
  {{/if}}

  {{#if fileDataUri}}
  File Content:
  {{media url=fileDataUri}}
  {{/if}}
  `,
});

const summarizeNotesFlow = ai.defineFlow(
  {
    name: 'summarizeNotesFlow',
    inputSchema: SummarizeNotesInputSchema,
    outputSchema: SummarizeNotesOutputSchema,
  },
  async input => {
    if (!input.notes && !input.fileDataUri) {
      throw new Error('Please provide notes or a file to summarize.');
    }
    const {output} = await summarizeNotesPrompt(input);
    return output!;
  }
);
