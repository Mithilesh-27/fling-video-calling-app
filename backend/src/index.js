import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;
import { connectDB } from './db/connect.db.js';
connectDB();

import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_DOMAIN || "http://localhost:5173",
  credentials: true, // Allow cookies to be sent in cross-origin requests
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);


app.get('/', (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
