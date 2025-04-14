import express from "express";
import connectDB from "./config/database.js";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import skillRouter from "./routes/skillRouter.js";

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRouter);
app.use("/api/skills", skillRouter);

// Export the app for Vercel
export default app;
