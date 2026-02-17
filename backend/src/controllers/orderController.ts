import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import Product from '../models/Product';
import BadRequestError from '../errors/bad-request-error';
import { HttpStatus } from '../constants/http-status';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { items, total } = req.body;

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      next(new BadRequestError('Товар не найден'));
      return;
    }

    const productWithNullPrice = products.find(
      (product) => product.price === null || product.price === undefined,
    );
    if (productWithNullPrice) {
      next(new BadRequestError('Товар недоступен для покупки: цена не указана'));
      return;
    }

    const id = randomUUID();

    res.status(HttpStatus.Ok).json({
      id,
      total,
    });
  } catch (error) {
    next(error);
  }
};

export default createOrder;
