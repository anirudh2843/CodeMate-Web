import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const isLoggedIn = false; // Replace this with your actual login state logic

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/feed"); // Redirect to the feed if the user is logged in
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-5xl">
      <h1>
        Welcome to the{" "}
        <span className="font-bold italic text-yellow-500">Coder's World!!!</span>
      </h1>
      <h2 className="text-xl font-bold text-yellow-500 mt-4 italic">
        Connect with{" "} 
        <span className="font-bold text-4xl text-gray-200">
           like-minded people
        </span>
      </h2>
      <button
        className="border border-blue-500 bg-black text-white text-2xl italic px-2 py-2 rounded-2xl cursor-pointer mt-3"
        onClick={() => navigate("/login")}
      >
        Let's Start
      </button>
    </div>
  );
};

export default Welcome;
