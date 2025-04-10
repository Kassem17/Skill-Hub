import mongoose from "mongoose";
const ProfileSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bio: String,
    avatar: String,
    publicSkills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
