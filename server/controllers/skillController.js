import Skill from "../models/Skill.js";
import User from "../models/User.js";

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
    if (progress < 0 || progress > 100) {
      return res.json({
        success: false,
        message: "Progress must be between 0 and 100.",
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
    const user = await User.findById(userId);

    if (user.role === "admin") {
      return res.json({
        success: false,
      });
    }

    const skills = await Skill.find({ user: userId });

    if (!skills || skills.length === 0) {
      return res.json({
        success: false,
        message: "No skills found for this user.",
      });
    }

    return res.json({
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

export const updateSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { progress } = req.body;
    const userId = req.user; // Provided by JWT middleware

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    if (progress === undefined || progress < 0 || progress > 100) {
      return res.status(400).json({
        success: false,
        message: "Progress must be a number between 0 and 100.",
      });
    }

    const skill = await Skill.findOneAndUpdate(
      { _id: skillId, user: userId },
      { progress },
      { new: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill edited successfully",
      skill,
    });
  } catch (error) {
    console.error("Error editing skill:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while editing skill.",
    });
  }
};

export const getSkillsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate that userId exists
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // Find user first
    const user = await User.findById(userId).select("-password -email"); // You can combine select exclusions

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Find skills for the user
    const skills = await Skill.find({ user: userId });

    return res.json({
      success: true,
      message: skills.length > 0 ? "Skills found." : "No skills found.",
      skills,
      user,
    });
  } catch (error) {
    console.error("Error fetching user skills:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching user skills.",
      error: error.message,
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const userId = req.user; // Provided by JWT middleware

    const skill = await Skill.findOneAndDelete({ _id: skillId, user: userId });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully.",
    });
  } catch (error) {
    console.error("Error editing skill:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while editing skill.",
    });
  }
};

// export const getSkillsForAllUsers = async (req, res) => {
//   try {
//     const skills = await Skill.find({});

//     return res.json({
//       success: true,
//       message: skills.length > 0 ? "Skills found." : "No skills found.",
//       skills: skills.length > 0 ? skills : [],
//     });
//   } catch (error) {
//     console.error("Error editing skill:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while editing skill.",
//     });
//   }
// };
