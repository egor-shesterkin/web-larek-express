import { HttpStatus } from '../constants/http-status';

class InternalServerError extends Error {
  public statusCode: number;

  constructor(message: string = 'Внутренняя ошибка сервера') {
    super(message);
    this.statusCode = HttpStatus.InternalServerError;
  }
}

export default InternalServerError;
