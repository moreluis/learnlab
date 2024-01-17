import mongoose from 'mongoose';

export interface Session {
  owner: mongoose.Types.ObjectId;
  code: string;
}

const SessionSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  code: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, index: { expires: 0 }, default: () => new Date(Date.now() + 2419200000) },
});

const SessionModel = mongoose.model<Session>('Session', SessionSchema);

export default SessionModel;