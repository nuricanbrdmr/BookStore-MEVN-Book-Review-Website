import express from "express";
import bookRoute from "./routes/bookRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import ratingRoute from "./routes/ratingRoute.js";
import commentRoute from "./routes/commentRoute.js";
import connectDb from "./config/db.js";
import cors from "cors";

const app = express();
const port = 3000;

const corsOption = {
    origin: ['http://localhost:5173'],
    credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

app.use('/api/v1/books', bookRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/comments', commentRoute);
app.use('/api/v1/rating', ratingRoute);

try {
    await connectDb();
    app.listen(port, () => {
        console.log('server is listening on port: ', port);
    });
} catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
}
