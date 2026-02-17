import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/http-status';

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
    res.status(HttpStatus.BadRequest).json(err);
    return;
  }

  if (err instanceof SyntaxError || (err?.message?.includes('JSON') ?? false)) {
    res.status(HttpStatus.InternalServerError).json({ message: err.message });
    return;
  }

  if (err && typeof err.statusCode === 'number') {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  res.status(HttpStatus.InternalServerError).json({
    message: 'Внутренняя ошибка сервера',
  });
};

export default errorHandler;
