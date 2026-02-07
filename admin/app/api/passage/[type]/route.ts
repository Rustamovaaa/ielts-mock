import Passage from "@/lib/models/Passage";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: RouteParams) {
  const { type } = await params;
  await connectToDatabase();
  const passage = await Passage.findOne({ type });
  if (!passage) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(passage);
}