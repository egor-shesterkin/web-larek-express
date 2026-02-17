import { Router } from 'express';
import productRoutes from './productRoutes';
import orderRoutes from './orderRoutes';

const router = Router();

router.use('/', productRoutes);
router.use('/', orderRoutes);

export default router;
