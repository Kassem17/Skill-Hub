import express from "express";
import connectDB from "./config/database.js";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import skillRouter from "./routes/skillRouter.js";

connectDB();
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "https://skill-hub-ndkf.vercel.app/", // Your frontend domain
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRouter);
app.use("/api/skills", skillRouter);

// Export the app for Vercel
export default app;
