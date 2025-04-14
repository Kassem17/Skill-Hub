import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Loader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loaderStyle, setLoaderStyle] = useState("");

  // Array of Tailwind class combinations for different loader styles
  const loaderStyles = [
    "animate-spin border-t-4 border-blue-500", // Style 1: Spin
    "animate-bounce border-t-4 border-red-500", // Style 2: Bounce
    "animate-pulse border-t-4 border-yellow-500", // Style 3: Pulse
    "animate-spin border-t-4 border-green-500", // Style 4: Spin with different color
    "animate-ping border-t-4 border-purple-500", // Style 5: Ping
  ];

  // Strip "/loader" from the beginning to get the redirect destination
  const targetPath = location.pathname.replace(/^\/loader/, "") || "/";

  useEffect(() => {
    // Randomly select a loader style from the array
    const randomStyle =
      loaderStyles[Math.floor(Math.random() * loaderStyles.length)];
    setLoaderStyle(randomStyle);

    // Redirect after 2 seconds
    const timer = setTimeout(() => {
      navigate(targetPath);
    }, 2000); // Redirect after 2 seconds

    return () => clearTimeout(timer);
  }, [targetPath, navigate]);

  return (
    <div className="mt-40 flex flex-col items-center justify-center mb-20">
      <div
        className={`relative w-16 sm:w-20 aspect-square border-4 border-gray-300 border-t-transparent rounded-full ${loaderStyle}`}
      >
        {/* Inner gradient layers */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 rounded-full"></div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-60 animate-pulse rounded-full"></div>
        <div className="absolute inset-0 w-full h-full border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="text-2xl mt-6 text-gray-700 font-semibold animate-fadeIn">
        Redirecting...
      </p>
    </div>
  );
};

export default Loader;
