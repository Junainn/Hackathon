import express from 'express';


const router = express.Router();
import {createOrder, getStudentOrders} from '../controllers/order.controller.js';

router.post('/', createOrder);
router.get('/',getStudentOrders)



export default router;