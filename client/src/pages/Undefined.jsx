import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // If using React Router

export default function undefined() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8 text-center">
      <motion.h1
        className="text-9xl font-extrabold text-blue-600 drop-shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 160 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-2xl text-gray-700 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Go Home
        </Link>
      </motion.div>

      <motion.div
        className="mt-12"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 0.2 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 24 24"
          fill="none"
          className="mx-auto opacity-30"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zm0 6.18L5.09 7 12 3.82 18.91 7 12 8.18zm0 1.82l10-5v10l-10 5-10-5V5l10 5zm0 2.82L5.09 11 12 14.18 18.91 11 12 12.82z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </div>
  );
}
