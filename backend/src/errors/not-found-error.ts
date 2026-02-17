import { HttpStatus } from '../constants/http-status';

class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string = 'Маршрут не найден') {
    super(message);
    this.statusCode = HttpStatus.NotFound;
  }
}

export default NotFoundError;
