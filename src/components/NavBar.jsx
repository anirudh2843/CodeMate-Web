import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import Error from "./Error";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const handleLogout=async  ()=>{
    try{
      await axios.post(BASE_URL+"/logout", {}, {withCredentials:true});
      dispatch(removeUser());
      return navigate("/login");
    }catch(err){
      <Error />
    }
  }


  return (
    <div className="navbar bg-base-200 shadow-sm bg-blue-800">
      <div className="flex-1">
        <Link to={"/"} className="text-2xl mx-2">CodeMate</Link>
      </div>
      {user && (
        <div className="flex gap-2 ">
        <div className="flex items-center">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-4 ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link  to={"/profile"}  className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
