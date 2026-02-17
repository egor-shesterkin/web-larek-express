import { Router } from 'express';
import { getAllProducts, createProduct } from '../controllers/productController';
import validateProductBody from '../middlewares/productValidators';

const router = Router();

router.get('/product', getAllProducts);
router.post('/product', validateProductBody, createProduct);

export default router;
