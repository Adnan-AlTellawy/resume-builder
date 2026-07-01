import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const user = { name: "john doe" };
  const navigate = useNavigate();
  const logoutUser = () => {
    navigate("/");
  };
  return (
    <div className="shadow bg-white">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        <Link to={"/"}>
          <img src="./logo.svg" className="h-11 w-auto"></img>
        </Link>
        <div className="flex items-center gap-4 text-md">
          
          <button
            onClick={logoutUser}
            className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 "
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
