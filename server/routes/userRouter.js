import express from "express";
import {
  addUser,
  changeAvailability,
  deleteUser,
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
userRouter.delete("/delete-user/:userId", deleteUser);
userRouter.post("/add-user", authUser, addUser);

userRouter.post("/change-availability/:userId", changeAvailability);

export default userRouter;
