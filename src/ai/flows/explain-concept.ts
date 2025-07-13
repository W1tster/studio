'use server';

/**
 * @fileOverview Explains a concept in simpler terms using the AI assistant.
 *
 * - explainConcept - A function that takes a difficult concept as input and returns a simplified explanation.
 * - ExplainConceptInput - The input type for the explainConcept function, which includes the concept to be explained.
 * - ExplainConceptOutput - The return type for the explainConcept function, which includes the simplified explanation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptInputSchema = z.object({
  concept: z
    .string()
    .describe('The difficult concept that needs to be explained in simpler terms.'),
});
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

const ExplainConceptOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A simplified explanation of the concept.'),
});
export type ExplainConceptOutput = z.infer<typeof ExplainConceptOutputSchema>;

export async function explainConcept(input: ExplainConceptInput): Promise<ExplainConceptOutput> {
  return explainConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConceptPrompt',
  input: {schema: ExplainConceptInputSchema},
  output: {schema: ExplainConceptOutputSchema},
  prompt: `You are an AI assistant helping students understand difficult concepts. Please explain the following concept in simpler terms:

Concept: {{{concept}}}

Explanation:`,
});

const explainConceptFlow = ai.defineFlow(
  {
    name: 'explainConceptFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: ExplainConceptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
