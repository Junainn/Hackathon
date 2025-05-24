import express from 'express';
import { getVendorOrders, updateOrderStatus,viewOrderDetails } from '../controllers/order.vendor.controller.js';
import { authVendorMiddleware } from '../middlewares/auth.vendor.middleware.js';
const router = express.Router();


router.get('/', authVendorMiddleware,getVendorOrders);
router.put('/:orderId', authVendorMiddleware,updateOrderStatus);
router.get('/:orderId', authVendorMiddleware,viewOrderDetails);




export default router;