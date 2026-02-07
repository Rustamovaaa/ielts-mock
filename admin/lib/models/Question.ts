import mongoose, { Schema, Document } from 'mongoose';

export type QuestionType = 'matching' | 'multiple_choice' | 'fill_summary' | 'fill_note';

export interface IQuestion extends Document {
  passage: mongoose.Types.ObjectId;
  title?: string;
  question: string;
  type: QuestionType;
  imageUrl?: string;
  order?: number;
  options?: { text: string; isCorrect: boolean }[];
  pairs?: { left: string; right: string }[];
  correctAnswer?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  passage: { type: Schema.Types.ObjectId, ref: 'Passage', required: true },
  title: { type: String },
  question: { type: String, required: true },
  type: { type: String, enum: ['matching', 'multiple_choice', 'fill_summary', 'fill_note'], required: true },
  imageUrl: { type: String },
  order: { type: Number },
  options: [{ text: String, isCorrect: Boolean }],
  pairs: [{ left: String, right: String }],
  correctAnswer: { type: String },
}, { timestamps: true });

export default mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);
