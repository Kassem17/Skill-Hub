import express from "express";
import connectDB from "./config/database.js";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import skillRouter from "./routes/skillRouter.js";
import progressRouter from "./routes/progressRouter.js";

connectDB();
const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/user", express.json(), userRouter);
app.use("/api/skills", express.json(), skillRouter);
app.use("/api/progress", express.json(), progressRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
