import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboardEntry';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const entries = await LeaderboardEntry.find()
      .sort({ rank: 1 })
      .populate('user', 'name email')
      .populate('team', 'name');
    res.json({ entries });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard entries' });
  }
});

export default router;
