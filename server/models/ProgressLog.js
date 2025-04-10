import mongoose from "mongoose";

const progressLogSchema = new mongoose.Schema(
  {
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    progressAmount: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ProgressLog = mongoose.model("ProgressLog", progressLogSchema);

export default ProgressLog;
