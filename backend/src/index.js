import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;
import { connectDB } from './db/connect.db.js';
connectDB();

import path from "path";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
app.use(cookieParser());
app.use(express.json());

const __dirname = path.resolve();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Allow cookies to be sent in cross-origin requests
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
