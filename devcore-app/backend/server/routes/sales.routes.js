import { Router } from "express";
import { deleteSales, getSales, getSale, createSales, updateSales } from '../controller/sales.controler.js'
const router = Router();

router.get('/sales', getSales);
router.post('/sales', createSales);
router.put('/sales/:id', updateSales);
router.delete('/sales/:id', deleteSales);
router.get('/sales/:id', getSale);

export default router;