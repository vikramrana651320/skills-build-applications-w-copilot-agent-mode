import mongoose, { Document, Schema, model } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  muscleGroups: string[];
  durationMinutes: number;
  description: string;
  recommendedFor: string;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  muscleGroups: { type: [String], required: true },
  durationMinutes: { type: Number, required: true },
  description: { type: String, required: true },
  recommendedFor: { type: String, required: true }
});

const Workout = model<IWorkout>('Workout', workoutSchema);
export default Workout;
