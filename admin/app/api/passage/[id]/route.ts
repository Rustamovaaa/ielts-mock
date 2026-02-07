import { NextResponse } from 'next/server';
import Passage from '@/lib/models/Passage';
import { passageSchema } from '@/lib/validation';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: Request, { params }: RouteParams) {
  const { id } = await params;
  await connectToDatabase();
  const passage = await Passage.findById(id).populate('questions');
  if (!passage) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(passage);
}

export async function PUT(req: Request, { params }: RouteParams) {
  const { id } = await params;
  await connectToDatabase();
  const data = await req.json();
  const parsed = passageSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Validation error', errors: parsed.error.errors }, { status: 400 });
  }
  const passage = await Passage.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!passage) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(passage);
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  const { id } = await params;
  await connectToDatabase();
  const passage = await Passage.findByIdAndDelete(id);
  if (!passage) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted' });
}
