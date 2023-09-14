import express from "express";

import 'dotenv/config.js';
import cors from 'cors'
import db from "./config/db.js";
import userRoutes from './routes/User.js'
import messageRoutes from './routes/Message.js'
import chatsRoutes from './routes/Chats.js'
// import morgan from "morgan";


const app = express();

const connectToMongoDB = (req, res, next) => {
    req.db = db;
    console.log("using the db middleware", db.host);
    next();
};

// app.use(morgan());
app.use(express.json());
app.use(cors());
//mongodb connection
app.use(connectToMongoDB);


app.use('/api/message', messageRoutes);
app.use("/api/user", userRoutes);
app.use('/api/chats', chatsRoutes)

//error handling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});
const port = process.env.PORT || 5000


app.listen(port, () => {
    console.log(`app running on port ${port}`);
})