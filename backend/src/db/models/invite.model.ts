import mongoose from 'mongoose';

export interface Invite {
  code: string;
  owner: mongoose.Types.ObjectId;
}

const InviteSchema = new mongoose.Schema<Invite>({
  code: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const InviteModel = mongoose.model<Invite>('Invite', InviteSchema);

export default InviteModel;