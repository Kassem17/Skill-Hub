import express from "express";
import { addSkill, getSkills } from "../controllers/skillController.js";
import authUser from "../middleware/authUser.js";

const skillRouter = express.Router();

skillRouter.post("/add-skill", authUser, addSkill);
skillRouter.get("/get-skills", authUser ,getSkills);

export default skillRouter;
