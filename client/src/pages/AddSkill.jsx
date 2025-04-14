import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Undefined from "./Undefined";
import { toast } from "react-toastify";

export default function AddSkill() {
  const { token, setSkills, getSkills, backendUrl } = useContext(AppContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [progress, setProgress] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const skillData = {
        name,
        description,
        goal,
        progress,
      };

      const { data } = await axios.post(
        backendUrl + "/api/skills/add-skill",
        skillData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setSkills(data.skills);
        toast.success(data.message);
        setName("");
        setDescription("");
        setGoal("");
        setProgress("");
        getSkills();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return token ? (
    <div className="flex items-center justify-center  w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <motion.div
        className="w-full max-w-4xl rounded-3xl shadow-2xl bg-white/60 backdrop-blur-xl border border-white/40 p-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Heading */}
        <motion.h2
          className="text-4xl font-extrabold text-center text-blue-700 mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          🌟 Add a New Skill
        </motion.h2>

        {/* Form */}
        <form className="grid gap-8">
          {/* Row 1: Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <motion.label
                htmlFor="name"
                animate={{
                  top: name ? -12 : 12,
                  left: 16,
                  fontSize: name ? "0.75rem" : "1rem",
                  color: name ? "#1D4ED8" : "#6B7280", // blue-700 : gray-500
                  backgroundColor: name ? "#ffffff" : "transparent",
                  padding: name ? "0 0.25rem" : "0",
                  borderRadius: name ? "0.375rem" : "0",
                  boxShadow: name ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute pointer-events-none z-10"
              >
                Name
              </motion.label>

              <motion.input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pt-8 pb-3 px-4 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm bg-white/80 backdrop-blur-md"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            {/* Row 1: Goal */}
            <div className="relative">
              <motion.label
                htmlFor="goal"
                animate={{
                  top: goal ? -12 : 12,
                  left: 16,
                  fontSize: goal ? "0.75rem" : "1rem",
                  color: goal ? "#1D4ED8" : "#6B7280", // blue-700 : gray-500
                  backgroundColor: goal ? "#ffffff" : "transparent",
                  padding: goal ? "0 0.25rem" : "0",
                  borderRadius: goal ? "0.375rem" : "0",
                  boxShadow: goal ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute pointer-events-none z-10"
              >
                Goal
              </motion.label>

              <motion.input
                type="text"
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full pt-8 pb-3 px-4 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm bg-white/80 backdrop-blur-md"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
          </div>

          {/* Row 2: Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <motion.label
                htmlFor="progress"
                animate={{
                  top: progress ? -12 : 12,
                  left: 16,
                  fontSize: progress ? "0.75rem" : "1rem",
                  color: progress ? "#1D4ED8" : "#6B7280", // blue-700 : gray-500
                  backgroundColor: progress ? "#ffffff" : "transparent",
                  padding: progress ? "0 0.25rem" : "0",
                  borderRadius: progress ? "0.375rem" : "0",
                  boxShadow: progress ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute pointer-events-none z-10"
              >
                Progress
              </motion.label>

              <motion.input
                type="number"
                id="progress"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="w-full pt-8 pb-3 px-4 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm bg-white/80 backdrop-blur-md"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
          </div>

          {/* Row 3: Description (Full Width) */}
          <div className="relative">
            <motion.label
              htmlFor="description"
              animate={{
                top: description ? -12 : 12,
                left: 16,
                fontSize: description ? "0.75rem" : "1rem",
                color: description ? "#1D4ED8" : "#6B7280", // blue-700 : gray-500
                backgroundColor: description ? "#ffffff" : "transparent",
                padding: description ? "0 0.25rem" : "0",
                borderRadius: description ? "0.375rem" : "0",
                boxShadow: description ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute pointer-events-none z-10"
            >
              Description
            </motion.label>

            <motion.textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full h-32 pt-6 pb-3 px-4 resize-none border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm bg-white/80 backdrop-blur-md"
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          {/* Row 4: Button */}
          <motion.div
            className="flex justify-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl"
            >
              ADD
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  ) : (
    <Undefined />
  );
}
