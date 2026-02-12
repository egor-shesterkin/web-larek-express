import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import Product from '../models/Product';
import BadRequestError from '../errors/bad-request-error';

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

    const id = randomUUID();

    res.status(200).json({
      id,
      total,
    });
  } catch (error) {
    next(error);
  }
};

export default createOrder;
