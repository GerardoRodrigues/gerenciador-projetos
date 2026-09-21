import { Router, Request, Response } from 'express';
import { db } from '../data/db';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/:id', authMiddleware, (req: Request, res: Response) => {
  const task = db.tasks.find(t => t.id === req.params.id);
  if (!task) {
    res.status(404).json({ message: 'Task não encontrada' });
    return;
  }
  res.json(task);
});

router.put('/:id', authMiddleware, (req: Request, res: Response) => {
  const taskIndex = db.tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) {
    res.status(404).json({ message: 'Task não encontrada' });
    return;
  }

  db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...req.body };
  res.json(db.tasks[taskIndex]);
});

export default router;
