import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
//import { IoIoArrowForward } from "react-icons/io";
import logo from "../assets/logo.png";
import { categories } from "../utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-4 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-4  font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";



const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    // check if closeToggle exist in case of mobile view it will exist
    if (closeToggle) {
      closeToggle(false);
    }
  };

  return (
    // todo: use redux
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-6 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            } //isActive provided by NavLink for react-router-dom
            onClick={handleCloseSidebar} // after selecting this closing the sidbar
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5  text-base 2xl:text-xl">
            {" "}
            Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              } //isActive provided by NavLink for react-router-dom
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img src={category.image} alt="category-img" className="w-5 h-5 rounded-full"/>
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link to={`user-profile/${user._id}`} 
        // use redux
        className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
        onClick={handleCloseSidebar}
        >
          <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile"  />
          <p>{user.username}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
