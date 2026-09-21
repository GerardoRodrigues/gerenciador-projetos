import { Router, Request, Response } from 'express';
import { db } from '../data/db';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authMiddleware, (req: Request, res: Response) => {
  res.json(db.projects);
});

router.get('/:id', authMiddleware, (req: Request, res: Response) => {
  const project = db.projects.find(p => p.id === req.params.id);
  if (!project) {
    res.status(404).json({ message: 'Projeto não encontrado' });
    return;
  }
  res.json(project);
});

router.get('/:pId/tasks', authMiddleware, (req: Request, res: Response) => {
  const tasks = db.tasks.filter(t => t.projectId === req.params.pId);
  res.json(tasks);
});

router.post('/:pId/tasks', authMiddleware, (req: Request, res: Response) => {
  const project = db.projects.find(p => p.id === req.params.pId);
  if (!project) {
    res.status(404).json({ message: 'Projeto não encontrado' });
    return;
  }

  const { title, description, status, assigneeId } = req.body;
  const newTask = {
    id: `t${Date.now()}`,
    projectId: project.id,
    title,
    description,
    status: status || 'todo',
    assigneeId
  };

  db.tasks.push(newTask as any);
  res.status(201).json(newTask);
});

export default router;
