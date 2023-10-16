import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import databaseConnect from './utilFiles/db.js';
import authRoute from './routers/authRoute.js';
import adminRoute from './routers/adminRoute.js';
import userRoute from './routers/userRouter.js'
import cors from 'cors'



const PORT = process.env.PORT || 4000; // Use the specified PORT or default to 4000
const app = express();
dotenv.config();
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());
app.use(cors())
app.use('/auth', authRoute);
app.use('/', userRoute);
app.use('/admin', adminRoute);
     
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";
    return res.status(errorStatus).json({success: false, status: errorStatus, message: errorMessage, stack: err.stack});
});

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
