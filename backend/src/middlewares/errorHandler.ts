import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err && typeof (err as any).isJoi === 'function' && (err as any).isJoi()) {
    res.status(400).json(err);
    return;
  }

  if (err && typeof err.statusCode === 'number') {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error('Unhandled error:', err);
  res.status(500).json({
    message: 'Внутренняя ошибка сервера',
  });
};
