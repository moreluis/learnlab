import mongoose from 'mongoose';

export interface Card {
  _id: mongoose.Types.ObjectId;
  question: string;
  answer: string;
  stack: String[];
  owner: mongoose.Types.ObjectId;
  next?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CardSchema = new mongoose.Schema<Card>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  stack: { type: [String], required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  next: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: false },
}, {
  timestamps: true,
});

CardSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const CardModel = mongoose.model<Card>('Card', CardSchema);

export default CardModel;