import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .populate('team', 'name sport');
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities' });
  }
});

export default router;
