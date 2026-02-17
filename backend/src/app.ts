import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import routes from './routes';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import NotFoundError from './errors/not-found-error';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use(routes);

app.use((_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/weblarek');
    console.log('Connected to MongoDB');
    app.listen(3000, () => { console.log('listening on port 3000'); });
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

start();
