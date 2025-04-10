import Skill from "../models/Skill.js";

// In your backend (skillController.js)
export const addSkill = async (req, res) => {
    try {
      const { name, description, goal, progress } = req.body;
      const userId = req.user; // Ensure this comes from the JWT middleware
  
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required.",
        });
      }
  
      const skill = new Skill({
        name,
        description,
        goal,
        progress,
        user: userId, // Store the userId in the skill document
      });
  
      await skill.save();
  
      return res.status(201).json({
        success: true,
        message: "Skill added successfully",
        skill,
      });
    } catch (error) {
      console.error("Error adding skill:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while adding the skill.",
      });
    }
  };
  





  export const getSkills = async (req, res) => {
    try {
      const userId = req.user; // Get the userId from the authenticated request
  
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required.",
        });
      }
  
      const skills = await Skill.find({ user: userId });
  
      if (!skills || skills.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No skills found for this user.",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Skills fetched successfully",
        skills,
      });
    } catch (error) {
      console.error("Error fetching skills:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while fetching skills.",
      });
    }
  };
  