import express from "express";
import {
  addSkill,
  deleteSkill,
  getSkills,
  getSkillsForUser,
  updateSkill,
} from "../controllers/skillController.js";
import authUser from "../middleware/authUser.js";

const skillRouter = express.Router();

skillRouter.post("/add-skill", authUser, addSkill);
skillRouter.get("/get-skills", authUser, getSkills);
skillRouter.put("/update-skill/:skillId", authUser, updateSkill);
skillRouter.get("/get-skills-for-user/:userId", getSkillsForUser);
skillRouter.delete("/delete-skill/:skillId", authUser, deleteSkill);

export default skillRouter;
