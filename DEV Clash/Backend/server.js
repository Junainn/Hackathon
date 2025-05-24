import express from 'express';

import {errorhandler} from './src/middlewares/error.middleware.js';
import connectDB from './src/config/db.js';
import {PORT} from './src/config/env.js';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/auth.routes.js';
import vendorRoutes from './src/routes/vendor.routes.js';
import menuRoutes from './src/routes/menuItem.routes.js';
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); 

app.use('/api/auth',authRoutes);
app.use('/api/vendor',vendorRoutes);
app.use('/api/vendor/menu',menuRoutes);

app.use(errorhandler);
app.listen(PORT,async()=>{
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
    console.log('Database connected');
})