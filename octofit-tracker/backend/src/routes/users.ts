import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const users = await User.find().populate('team', 'name sport');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

export default router;
