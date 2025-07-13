'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating questions based on a given topic.
 *
 * - generateQuestions - A function that takes a topic as input and returns a list of questions related to that topic.
 * - GenerateQuestionsInput - The input type for the generateQuestions function.
 * - GenerateQuestionsOutput - The return type for the generateQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate questions.'),
});
export type GenerateQuestionsInput = z.infer<typeof GenerateQuestionsInputSchema>;

const GenerateQuestionsOutputSchema = z.object({
  questions: z.array(z.string()).describe('A list of questions related to the topic.'),
});
export type GenerateQuestionsOutput = z.infer<typeof GenerateQuestionsOutputSchema>;

export async function generateQuestions(input: GenerateQuestionsInput): Promise<GenerateQuestionsOutput> {
  return generateQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionsPrompt',
  input: {schema: GenerateQuestionsInputSchema},
  output: {schema: GenerateQuestionsOutputSchema},
  prompt: `You are an expert in generating questions for students to test their knowledge on a given topic.

  Generate a list of questions related to the following topic:

  Topic: {{{topic}}}
  `,
});

const generateQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFlow',
    inputSchema: GenerateQuestionsInputSchema,
    outputSchema: GenerateQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
