import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { connectDb } from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import commentRoute from "./routes/comment.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";

config();
const app = express();
const PORT = process.env.PORT || 9080;
const DB_URL = process.env.MONGO_URL;

// app routes
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

// ******** Deployment *******

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Enternal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.get("/", (req, res) => res.send("ok ok"));

app.listen(PORT, async () => {
  await connectDb(DB_URL);
  console.log(`Server is runnig at http://localhost:${PORT}`);
});
