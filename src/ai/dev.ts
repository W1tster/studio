import { config } from 'dotenv';
config();

import '@/ai/flows/explain-concept.ts';
import '@/ai/flows/summarize-notes.ts';
import '@/ai/flows/generate-questions.ts';
import '@/ai/flows/chat.ts';
