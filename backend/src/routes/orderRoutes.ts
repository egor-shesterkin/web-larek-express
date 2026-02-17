import { Router } from 'express';
import createOrder from '../controllers/orderController';
import validateOrderBody from '../middlewares/orderValidators';

const router = Router();

router.post('/order', validateOrderBody, createOrder);

export default router;
