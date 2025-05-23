import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import Error from "./Error";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleLinkClick = () => {
    if (!user) {
      navigate("/welcome");
    } else {
      navigate("/feed");
    }
  };

  return (
    <nav className="bg-blue-800 text-white shadow-sm w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLinkClick}
            className="text-2xl font-bold cursor-pointer"
          >
            CodeMate
          </button>
        </div>

        {/* Right Section */}
        {user && (
          <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-0">
            <div className="text-sm sm:text-base">
              Welcome, <span className="font-mono">{user.firstName}</span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/connections"
                className="inline-block rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
              >
                Friends
              </Link>
              <Link
                to="/requests"
                className="inline-block rounded-full bg-gradient-to-r from-yellow-500 to-green-500 px-5 py-2 text-sm font-semibold text-white shadow-md hover:from-pink-600 hover:to-green-600 transition-all duration-200"
              >
                Requests
              </Link>
            </div>

            {/* Avatar Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring-2 ring-white">
                  <img alt="User" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 space-y-1 shadow-lg bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-xl w-44"
              >
                <li>
                  <Link
                    to="/feed"
                    className="hover:bg-gray-700 rounded-md px-3 py-2 transition-colors duration-150"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:bg-gray-700 rounded-md px-3 py-2 transition-colors duration-150"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left hover:bg-red-600 rounded-md px-3 py-2 transition-colors duration-150"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
