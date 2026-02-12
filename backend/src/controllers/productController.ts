import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/Product';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const products = await Product.find();
    res.json({
      items: products,
      total: products.length,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      title, image, category, description, price,
    } = req.body;

    const product = new Product({
      title,
      image: {
        fileName: image.fileName,
        originalName: image.originalName,
      },
      category,
      description,
      price: price !== undefined ? price : null,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error: unknown) {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError(error.message));
      return;
    }
    if (error instanceof Error && error.message.includes('E11000')) {
      next(new ConflictError('Товар с таким названием уже существует'));
      return;
    }
    next(error);
  }
};
