import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/Product';
import BadRequestError from '../errors/bad-request-error';

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { total, items } = req.body;

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return next(new BadRequestError('Один или несколько идентификаторов товаров не найдены'));
    }

    const productsNotForSale = products.filter((product) => product.price === null);
    if (productsNotForSale.length > 0) {
      return next(new BadRequestError('Один или несколько товаров недоступны для покупки (цена не указана)'));
    }

    const calculatedTotal = products.reduce((sum, product) => {
      return sum + (product.price || 0);
    }, 0);

    if (calculatedTotal !== total) {
      return next(new BadRequestError('Сумма заказа не совпадает с суммой товаров'));
    }

    const orderId = faker.string.uuid();

    res.status(201).json({
      id: orderId,
      total,
    });
  } catch (error: unknown) {
    if (error instanceof MongooseError.CastError) {
      return next(new BadRequestError('Некорректный формат идентификатора товара'));
    }
    next(error);
  }
};
