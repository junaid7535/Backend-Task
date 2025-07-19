import express from 'express';
import { createProduct,getOrder,getAllProducts,getAllOrder} from '../controllers/controller.js';

const router = express.Router();

router.post('/products',createProduct)
router.get('/products',getAllProducts)

router.post('/orders',getOrder)
router.get('/orders/:user_id',getAllOrder);

export default router;