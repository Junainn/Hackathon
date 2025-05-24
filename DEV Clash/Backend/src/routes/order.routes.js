import express from 'express';

import { authStudentMiddleware } from '../middlewares/auth.student.middleware.js';
const router = express.Router();
import {createOrder, getStudentOrders} from '../controllers/order.controller.js';

router.post('/', authStudentMiddleware,createOrder);
router.get('/',authStudentMiddleware,getStudentOrders)



export default router;