import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import LeaderboardEntry from '../models/leaderboardEntry';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      LeaderboardEntry.deleteMany({})
    ]);

    const teams = await Team.create([
      {
        name: 'Velocity Vipers',
        sport: 'Running',
        members: [],
        totalPoints: 1240
      },
      {
        name: 'Core Crushers',
        sport: 'CrossFit',
        members: [],
        totalPoints: 980
      },
      {
        name: 'Zen Zone',
        sport: 'Yoga',
        members: [],
        totalPoints: 740
      }
    ]);

    const users = await User.create([
      {
        name: 'Avery Chen',
        email: 'avery.chen@example.com',
        role: 'captain',
        team: teams[0]._id,
        goals: ['Improve 5K pace', 'Run 15 miles per week'],
        totalPoints: 520
      },
      {
        name: 'Mia Patel',
        email: 'mia.patel@example.com',
        role: 'member',
        team: teams[0]._id,
        goals: ['Increase endurance', 'Join weekly trail run'],
        totalPoints: 430
      },
      {
        name: 'Jordan Brooks',
        email: 'jordan.brooks@example.com',
        role: 'captain',
        team: teams[1]._id,
        goals: ['Master Olympic lifts', 'Complete 5 WODs this month'],
        totalPoints: 610
      },
      {
        name: 'Layla Gomez',
        email: 'layla.gomez@example.com',
        role: 'member',
        team: teams[1]._id,
        goals: ['Improve mobility', 'Hit a new PR'],
        totalPoints: 370
      },
      {
        name: 'Noah Kim',
        email: 'noah.kim@example.com',
        role: 'coach',
        team: teams[2]._id,
        goals: ['Lead restorative classes', 'Support teammates'],
        totalPoints: 540
      }
    ]);

    teams[0].members = [users[0]._id, users[1]._id];
    teams[1].members = [users[2]._id, users[3]._id];
    teams[2].members = [users[4]._id];
    await Promise.all(teams.map((team) => team.save()));

    await Workout.create([
      {
        title: 'Morning Energy Flow',
        difficulty: 'Beginner',
        muscleGroups: ['Core', 'Legs'],
        durationMinutes: 20,
        description: 'A gentle sequence of mobility and strength moves to start the day with energy.',
        recommendedFor: 'New members and recovery days'
      },
      {
        title: 'HIIT Sprint Builder',
        difficulty: 'Advanced',
        muscleGroups: ['Legs', 'Cardio'],
        durationMinutes: 30,
        description: 'High-intensity intervals focused on running power and speed.',
        recommendedFor: 'Experienced runners aiming for a faster 5K pace'
      },
      {
        title: 'Core Crusher Circuit',
        difficulty: 'Intermediate',
        muscleGroups: ['Core', 'Full body'],
        durationMinutes: 25,
        description: 'A fast-paced cross-training routine built around core strength and balance.',
        recommendedFor: 'CrossFit members and strength-focused athletes'
      },
      {
        title: 'Sunrise Stretch and Restore',
        difficulty: 'Beginner',
        muscleGroups: ['Back', 'Shoulders', 'Hips'],
        durationMinutes: 35,
        description: 'A restorative yoga flow to improve flexibility and reduce tension.',
        recommendedFor: 'Yoga enthusiasts and recovery days'
      }
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: '5K Run',
        durationMinutes: 28,
        distanceKm: 5,
        caloriesBurned: 360,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1)
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'Trail Run',
        durationMinutes: 42,
        distanceKm: 7.5,
        caloriesBurned: 520,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'CrossFit WOD',
        durationMinutes: 35,
        caloriesBurned: 610,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1)
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'Olympic Lifting',
        durationMinutes: 55,
        caloriesBurned: 680,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
      },
      {
        user: users[4]._id,
        team: teams[2]._id,
        type: 'Yoga Flow',
        durationMinutes: 40,
        caloriesBurned: 210,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1)
      }
    ]);

    await LeaderboardEntry.create([
      {
        user: users[2]._id,
        team: teams[1]._id,
        totalPoints: 610,
        rank: 1
      },
      {
        user: users[4]._id,
        team: teams[2]._id,
        totalPoints: 540,
        rank: 2
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        totalPoints: 520,
        rank: 3
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        totalPoints: 430,
        rank: 4
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        totalPoints: 370,
        rank: 5
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
