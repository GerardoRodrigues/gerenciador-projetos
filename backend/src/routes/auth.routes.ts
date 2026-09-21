import { Router, Request, Response } from 'express';
import { db } from '../data/db';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  const { email } = req.body;
  const user = db.users.find(u => u.email === email);

  if (!user) {
    res.status(401).json({ message: 'Credenciais inválidas' });
    return;
  }

  // O token aqui é simplesmente o ID do user pra facilitar
  res.json({ token: user.id, user });
});

router.get('/me', authMiddleware, (req: Request, res: Response) => {
  res.json((req as any).user);
});

export default router;
