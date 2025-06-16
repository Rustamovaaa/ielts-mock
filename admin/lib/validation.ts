import { z } from 'zod';

export const passageSchema = z.object({
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(['reading', 'listening']),
  content: z.string().optional(),
  audioUrl: z.string().optional(),
});

export const questionSchema = z.object({
  passage: z.string().regex(/^[a-f\d]{24}$/i),
  title: z.string().optional(),
  question: z.string(),
  type: z.enum(['matching', 'multiple_choice', 'fill_summary', 'fill_note']),
  imageUrl: z.string().optional(),
  order: z.number().optional(),
  options: z.array(z.object({ text: z.string(), isCorrect: z.boolean() })).optional(),
  pairs: z.array(z.object({ left: z.string(), right: z.string() })).optional(),
  correctAnswer: z.string().optional(),
});
