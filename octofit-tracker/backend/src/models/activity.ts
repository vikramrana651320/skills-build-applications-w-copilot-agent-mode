import mongoose, { Document, Schema, model } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Activity = model<IActivity>('Activity', activitySchema);
export default Activity;
