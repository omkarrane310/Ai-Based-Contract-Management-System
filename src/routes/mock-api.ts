import { Router } from 'express';

const router = Router();

const users = [
  { _id: '1', displayName: 'John Doe', email: 'john@example.com', isPremium: true },
  { _id: '2', displayName: 'Jane Smith', email: 'jane@example.com', isPremium: false },
  { _id: '3', displayName: 'Alice Johnson', email: 'alice@example.com', isPremium: true },
  { _id: '4', displayName: 'Bob Brown', email: 'bob@example.com', isPremium: false },
  { _id: '5', displayName: 'Charlie Davis', email: 'charlie@example.com', isPremium: true },
  { _id: '6', displayName: 'David Evans', email: 'david@example.com', isPremium: false },
  { _id: '7', displayName: 'Eve Foster', email: 'eve@example.com', isPremium: false },
  { _id: '8', displayName: 'Frank Green', email: 'frank@example.com', isPremium: false },
  { _id: '9', displayName: 'Grace Harris', email: 'grace@example.com', isPremium: false },
  { _id: '10', displayName: 'Hank Irving', email: 'hank@example.com', isPremium: false },
];

router.get('/users', (req, res) => {
  res.status(200).json(users);
});

router.get('/contracts/count', (req, res) => {
  res.status(200).json({ count: 10 });
});

export default router;