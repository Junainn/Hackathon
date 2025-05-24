import express from 'express';
import { getVendorOrders, updateOrderStatus,viewOrderDetails } from '../controllers/order.vendor.controller.js';
const router = express.Router();


router.get('/', getVendorOrders);
router.put('/:orderId', updateOrderStatus);
router.get('/:orderId', viewOrderDetails);




export default router;