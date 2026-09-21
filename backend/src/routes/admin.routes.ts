import { Router, Request, Response } from 'express';
import { db } from '../data/db';
import { authMiddleware, adminGuard } from '../middleware/auth.middleware';

const router = Router();

router.get('/users', authMiddleware, adminGuard, (req: Request, res: Response) => {
  res.json(db.users);
});

router.get('/audit-log', authMiddleware, adminGuard, (req: Request, res: Response) => {
  res.json(db.auditLogs);
});

export default router;
