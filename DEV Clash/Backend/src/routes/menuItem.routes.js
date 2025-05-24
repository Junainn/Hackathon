import express from 'express';
const router = express.Router();
import { addMenuItem } from '../controllers/menuItem.controller.js';
import {authVendorMiddleware} from '../middlewares/auth.vendor.middleware.js';
router.get('/', (req, res) => {
    res.send('Menu Items Endpoint');
});


router.post('/',authVendorMiddleware, addMenuItem);
//router.get('/menu', getAllMenuItems);


export default router;