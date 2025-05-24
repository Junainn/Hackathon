import express from 'express';
import cors from 'cors';
import {errorhandler} from './src/middlewares/error.middleware.js';
import connectDB from './src/config/db.js';
import {PORT} from './src/config/env.js';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/auth.routes.js';
import vendorRoutes from './src/routes/vendor.routes.js';
import menuRoutes from './src/routes/menuItem.routes.js';
import orderRoutes from './src/routes/order.vendor.routes.js';
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); 
app.use(cors({
  origin: 'http://localhost:3000', // Example frontend URL (React dev server)
  credentials: true                // Allow cookies and auth headers
}));
app.use('/api/auth',authRoutes);
app.use('/api/vendors',vendorRoutes);
app.use('/api/vendor/menu',menuRoutes);
app.use('/api/vendor/order',orderRoutes);
app.use(errorhandler);
app.listen(PORT,async()=>{
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
    console.log('Database connected');
})