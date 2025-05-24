import express from 'express';
import { userLogin, userRegister, userLogout } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup',userRegister)
router.post('/signin',userLogin )
router.post('/signout',userLogout );


export default router;