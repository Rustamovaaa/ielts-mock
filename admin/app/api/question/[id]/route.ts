import { NextResponse } from 'next/server';
import Question from '@/lib/models/Question';
import { questionSchema } from '@/lib/validation';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(_req: Request, { params }: RouteParams) {
  const { id } = await params;
  await connectToDatabase();
  const question = await Question.findById(id);
  if (!question) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(question);
}

export async function PUT(req: Request, { params }: RouteParams) {
  const { id } = await params;
  await connectToDatabase();
  const data = await req.json();
  const parsed = questionSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Validation error', errors: parsed.error.errors }, { status: 400 });
  }
  const question = await Question.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!question) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(question);
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  const { id } = await params;
  await connectToDatabase();
  const question = await Question.findByIdAndDelete(id);
  if (!question) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted' });
}
