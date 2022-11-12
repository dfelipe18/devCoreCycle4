import { Router } from "express";
import { deleteProducts, getProduct, getProducts, createProducts, updateProducts } from '../controller/products.controller.js'
const router = Router();

router.get('/products', getProducts);
router.post('/products', createProducts);
router.put('/products/:id', updateProducts);
router.delete('/products/:id', deleteProducts);

router.get('/products/:id', getProduct);

export default router;