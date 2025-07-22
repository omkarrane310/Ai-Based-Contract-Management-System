import { Router } from 'express';
import User from '../models/user.model';
import Contract from '../models/contract.model'; // Assuming you have a Contract model
import { adminAuth } from '../middleware/admin';

const router = Router();

router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, 'email displayName isPremium');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/contracts/count', adminAuth, async (req, res) => {
  try {
    const contractCount = await Contract.countDocuments();
    res.status(200).json({ count: contractCount });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;