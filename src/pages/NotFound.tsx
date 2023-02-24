import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex-grow h-full mt-20">
      <div className="w-full h-full max-w-baseWidth mx-auto px-6 md:px-12 py-6 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-9xl">404</h2>
          <p className="font-semibold text-lg mt-2">Page Not Found</p>
          <p className="text-gray-500 mt-1">The page you're looking for does not seem to exist</p>
          <Link to="/" className="mt-10 bg-red-600 text-white px-4 py-2 rounded-lg">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
