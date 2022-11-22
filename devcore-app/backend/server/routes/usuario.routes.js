import { Router } from "express";
import {prueba, registrar,confirmar} from '../controller/UserController.js';
const router = Router();

router.get('/prueba', prueba);
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);

export default router;