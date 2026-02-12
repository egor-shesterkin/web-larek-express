import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import { requestLogger, errorLogger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import NotFoundError from './errors/not-found-error';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

mongoose.connect('mongodb://127.0.0.1:27017/weblarek')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use('/', productRoutes);
app.use('/', orderRoutes);

app.use((_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(3000, () => {console.log('listening on port 3000');});
