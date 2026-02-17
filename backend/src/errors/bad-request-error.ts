import { HttpStatus } from '../constants/http-status';

class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string = 'Переданы некорректные данные') {
    super(message);
    this.statusCode = HttpStatus.BadRequest;
  }
}

export default BadRequestError;
