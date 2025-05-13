import mongoose, { Schema, Document } from 'mongoose';

export type PassageType = 'reading' | 'listening';

export interface IPassage extends Document {
  passage_image?: string;
  title?: string;
  description?: string;
  type: PassageType;
  content?: string;
  audioUrl?: string;
  questions: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const PassageSchema = new Schema<IPassage>({
  passage_image: { type: String },
  title: { type: String },
  description: { type: String },
  type: { type: String, enum: ['reading', 'listening'], required: true },
  content: { type: String },
  audioUrl: { type: String },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
}, { timestamps: true });

export default mongoose.models.Passage || mongoose.model<IPassage>('Passage', PassageSchema);
