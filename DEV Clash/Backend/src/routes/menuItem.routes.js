import express from 'express';
const router = express.Router();
import { addMenuItem,deleteMenuItem,updateMenuItem } from '../controllers/menuItem.controller.js';
import {authVendorMiddleware} from '../middlewares/auth.vendor.middleware.js';
router.get('/', (req, res) => {
    res.send('Menu Items Endpoint');
});


router.post('/',authVendorMiddleware, addMenuItem);
//router.get('/menu', getAllMenuItems);
router.put('/:menuItemId', authVendorMiddleware, updateMenuItem);
router.delete('/:menuItemId', authVendorMiddleware, deleteMenuItem)

export default router;