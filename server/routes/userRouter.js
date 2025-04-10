import express from "express";
import {
  getAllUsers,
  getUser,

  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/get-profile", authUser, getUser);
userRouter.get("/get-users", getAllUsers);


export default userRouter;
