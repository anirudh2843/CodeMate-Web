import React, { useEffect } from "react";
import NavBar from "./NavBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="bg-[url('https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?ga=GA1.1.1193564850.1741929643&semt=ais_hybrid')] 
      bg-cover bg-center min-h-screen w-full flex flex-col">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
  
  
};

export default Body;
