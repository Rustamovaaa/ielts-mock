import { NextResponse } from 'next/server';
import Question from '@/lib/models/Question';
import { questionSchema } from '@/lib/validation';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const passage = searchParams.get('passage');
  const filter: any = {};
  if (passage) filter.passage = passage;
  const questions = await Question.find(filter);
  return NextResponse.json(questions);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const parsed = questionSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Validation error', errors: parsed.error.errors }, { status: 400 });
  }
  const question = await Question.create(parsed.data);
  return NextResponse.json(question, { status: 201 });
}
