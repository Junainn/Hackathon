import express from 'express';

import {errorhandler} from './src/middlewares/error.middleware.js';
import connectDB from './src/config/db.js';
import {PORT} from './src/config/env.js';

import authRoutes from './src/routes/auth.routes.js';
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.use('/api/auth',authRoutes);

app.use(errorhandler);
app.listen(PORT,async()=>{
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
    console.log('Database connected');
})