import mongoose from 'mongoose';

export interface User {
  _id: mongoose.Types.ObjectId;
  name: string;
  password: string;
  invitedBy: mongoose.Types.ObjectId;
  view: number,
  createdAt: Date;
  streak?: number,
  streakLastUpdatedAt?: Date,
}

const UserSchema = new mongoose.Schema<User>({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  view: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  streak: { type: Number, required: false },
  streakLastUpdatedAt: { type: Date, required: false },
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;