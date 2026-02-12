import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err && typeof (err as any).isJoi === 'function' && (err as any).isJoi()) {
    res.status(400).json(err);
    return;
  }

  if (err instanceof SyntaxError || (err?.message?.includes('JSON') ?? false)) {
    res.status(500).json({ message: err.message });
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

export default errorHandler;
