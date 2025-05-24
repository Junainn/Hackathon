import express from 'express';

import { getAllVendors,listVendorMenu } from '../controllers/vendor.controller.js';
import { authStudentMiddleware } from '../middlewares/auth.student.middleware.js';
const router = express.Router();



router.get('/',authStudentMiddleware ,getAllVendors );

router.get('/:id/menu', authStudentMiddleware,listVendorMenu);


export default router;
