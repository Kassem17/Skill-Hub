import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Skill from "../models/Skill.js";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const image = req.file;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImage: {
        data: image.buffer,
        contentType: image.mimeType,
      },
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({
      success: true,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const user = await User.findOne({ email });

    if (!user.active) {
      return res.json({
        success: false,
        message: "User is not active",
      });
    }

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      return res.json({
        success: true,
        message: "Login successful",
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Incorrect credentials",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export const logoutUser = (req, res) => {
  try {
    // For JWT-based auth, the server doesn't need to do much.
    // We can simply inform the client to delete their token.
    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to log out",
    });
  }
};

// export const getUser = async (req, res) => {
//   try {
//     const userId = req.user;

//     if (!userId) {
//       return res
//         .status(400)
//         .json({ message: "User ID is missing from request" });
//     }

//     const user = await User.findById(userId).lean().select("-password");

//     if (user.role === "user") {
//       return res.status(200).json({ success: true, user });
//     }

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("Error in getUser:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: error.message });
//   }
// };

export const getUser = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }

    let profileImage = null;

    if (user.profileImage && user.profileImage.data) {
      profileImage = `data:${
        user.profileImage.contentType
      };base64,${user.profileImage.data.toString("base64")}`;
    }

    const adminData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      profileImage,
    };
    if (user.role === "admin") {
      return res.json({
        success: true,
        user: adminData,
      });
    }

    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      active: user.active,
      profileImage,
    };

    if (user.role === "user") {
      return res.json({
        success: true,
        user: userData,
      });
    }
  } catch (error) {
    console.error("Error in addUser:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } })
      .select("-password")
      .lean();

    const usersWithImages = users.map((user) => {
      let profileImage = null;

      if (user.profileImage && user.profileImage.data) {
        profileImage = `data:${
          user.profileImage.contentType
        };base64,${user.profileImage.data.toString("base64")}`;
      }

      return {
        ...user,
        profileImage,
      };
    });

    return res.status(200).json({ success: true, users: usersWithImages });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOneAndDelete({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      await Skill.deleteMany({ user: userId });
      return res.json({ success: true, message: "User deleted successfully" });
    }
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
export const addUser = async (req, res) => {
  try {
    const userId = req.user;

    const admin = await User.findById(userId);

    if (!admin || admin.role !== "admin") {
      return res.status(401).json({ message: "Only admin can add users" });
    }

    const { firstName, lastName, email, password } = req.body;
    const image = req.file;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImage: {
        data: image.buffer,
        contentType: image.mimeType,
      },
    });

    await newUser.save();

    return res.json({
      success: true,
      message: "User added successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in addUser:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const changeAvailability = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.active = !user.active;
    await user.save();

    return res.json({
      success: true,
      user,
      message: !user.active
        ? "User status changed to active."
        : "User status changed to inactive.",
    });
  } catch (error) {
    console.error("Error in changeAvailability:", error);
    return res.json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
