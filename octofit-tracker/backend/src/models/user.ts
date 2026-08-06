import mongoose, { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'member' | 'captain' | 'coach';
  team?: mongoose.Types.ObjectId;
  goals: string[];
  totalPoints: number;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['member', 'captain', 'coach'], default: 'member' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  goals: { type: [String], default: [] },
  totalPoints: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() }
});

const User = model<IUser>('User', userSchema);
export default User;
