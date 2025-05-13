import { NextResponse } from 'next/server';
import Passage from '@/lib/models/Passage';
import "@/lib/models/Question";
import { passageSchema } from '@/lib/validation';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const filter: any = {};
  if (type) filter.type = type;
  const passages = await Passage.find(filter).populate('questions');
  return NextResponse.json(passages);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const parsed = passageSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Validation error', errors: parsed.error.errors }, { status: 400 });
  }
  const passage = await Passage.create(parsed.data);
  return NextResponse.json(passage, { status: 201 });
}
