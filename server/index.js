import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import postRoutes from './routes/postRoute.js';
import cookieParser from 'cookie-parser';


dotenv.config();

mongoose.connect(process.env.MONGO).then( () => {
    console.log('MongoDB is connected!');
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(5001, () => {
    console.log('Server is running on port 5001!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.use( (err, req, res, next) =>{
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error';
   res.status(statusCode).json({
    success: false,
    statusCode,
    message
   })
})