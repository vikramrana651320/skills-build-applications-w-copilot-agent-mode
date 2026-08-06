import mongoose, { Document, Schema, model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: mongoose.Types.ObjectId[];
  totalPoints: number;
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalPoints: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() }
});

const Team = model<ITeam>('Team', teamSchema);
export default Team;
