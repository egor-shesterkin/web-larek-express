import { HttpStatus } from '../constants/http-status';

class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string = 'Товар с таким названием уже существует') {
    super(message);
    this.statusCode = HttpStatus.Conflict;
  }
}

export default ConflictError;
