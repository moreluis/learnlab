import mongoose from 'mongoose';

export interface Note {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  directory: string;
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new mongoose.Schema<Note>({
  title: { type: String, required: true },
  content: { type: String, required: false },
  directory: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
}, {
  timestamps: true,
});

NoteSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const NoteModel = mongoose.model<Note>('Note', NoteSchema);

export default NoteModel;