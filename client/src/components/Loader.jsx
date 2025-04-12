import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Loader = () => {
  const { path } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // If no path is found, redirect to a default page
    if (!path) {
      navigate(`/skills`); // Replace '/default-path' with an actual path
      return;
    }

    const timer = setTimeout(() => {
      navigate(`/${path}`);
    }, 2000); // Redirect after 5 seconds

    // Cleanup function to clear the timeout on unmount or path change
    return () => clearTimeout(timer);
  }, [path, navigate]);

  return (
    <div className="mt-40 flex flex-col items-center justify-center mb-20">
      {/* Loader Spinner with gradient, shadow, and pulse effect */}
      <div className="relative w-16 sm:w-20 aspect-square border-4 border-gray-300 border-t-4 border-t-transparent rounded-full animate-spin-slow">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 rounded-full"></div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-60 animate-pulse rounded-full"></div>
        <div className="absolute inset-0 w-full h-full border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
      </div>

      {/* Loading text with animation */}
      <p className="text-2xl mt-6 text-gray-700 font-semibold animate-fadeIn">
        Redirecting...
      </p>
    </div>
  );
};

export default Loader;
