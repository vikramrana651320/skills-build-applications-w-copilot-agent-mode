import mongoose, { Document, Schema, model } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  totalPoints: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  totalPoints: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() }
});

const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
export default LeaderboardEntry;
