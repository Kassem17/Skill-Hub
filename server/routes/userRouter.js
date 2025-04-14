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
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("profileImage"), registerUser);

userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/get-profile", authUser, getUser);
userRouter.get("/get-users", getAllUsers);
userRouter.delete("/delete-user/:userId", deleteUser);
userRouter.post("/add-user", authUser, upload.single("profileImage"), addUser);
userRouter.post("/change-availability/:userId", changeAvailability);

export default userRouter;
