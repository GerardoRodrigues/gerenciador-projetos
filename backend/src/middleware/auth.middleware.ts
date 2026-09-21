import { Request, Response, NextFunction } from 'express';
import { db } from '../data/db';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Não autorizado. Token ausente ou inválido.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  // Fake token is just the user id
  const user = db.users.find(u => u.id === token);

  if (!user) {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }

  // Inject user into request object
  (req as any).user = user;
  next();
};

export const adminGuard = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user?.role !== 'admin') {
    res.status(403).json({ message: 'Acesso negado. Requer permissão de admin.' });
    return;
  }
  next();
};
