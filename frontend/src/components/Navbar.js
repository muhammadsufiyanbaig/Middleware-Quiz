import React from "react";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get('http://localhost:5001/logout');
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-gray-50 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <NavLink to="/">
          <h1 className="sm:text-2xl lg:text-4xl font-bold">
            Quiz
            <span className="text-green-500">App</span>
          </h1>
        </NavLink>
        <div className="flex justify-end items-end px-4">
          {/* <div className=" lg:flex divide-x border-r sm:border-l">
            <NavLink
              to={"/profile/:id"}
              className="flex flex-col items-center gap-y-1.5 h-12 w-12"
            >
              <CgProfile className="sm:text-lg lg:text-2xl text-gray-700" />
              <span className=" text-xs font-semibold text-gray-500 sm:block">
                Profile
              </span>
            </NavLink>
          </div> */}
          <div className=" lg:flex divide-x border-r sm:border-l">
            <button
              onClick={logout}
              className="flex flex-col items-center gap-y-1.5 h-12 w-12"
            >
              <IoMdLogOut className="sm:text-lg lg:text-2xl text-gray-700" />
              <span className=" text-xs font-semibold text-gray-500 sm:block">
                LogOut
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
