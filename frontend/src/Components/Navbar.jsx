import React, { useState } from "react";
import "../CSS/Components/Navbar.css";
import Dropdown from "./Dropdown.jsx";
import usericonwhite from "../assets/images/usericonwhite.png";
import bell from "../assets/images/bell.png";
import logout from "../assets/images/logout.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

const Navbar = () => {
  const [DropDown, setDropDown] = useState(false);
  const { authState } = useContext(AuthContext);
  const { setAuthState } = useContext(AuthContext);
  const signOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };
  return (
    <header className="header">
      <a href="/home" className="logo">
        Kangaroo
      </a>
      {authState.status ? (
        <nav className="navbar">
          <Link to="/Profile">
            <img src={usericonwhite} alt="user-icon-white"></img>
          </Link>

          <a
            className="notification"
            onClick={() => setDropDown((prev) => !prev)}
          >
            <img src={bell} alt="notification-bell"></img>
          </a>
          <a className="log-out" href="/">
            <img
              src={logout}
              alt="logout-image"
              onClick={() => signOut()}
            ></img>
          </a>
        </nav>
      ) : (
        <div>
          <a href="/">Put a sign in button here!</a>
        </div>
      )}

      {DropDown && <Dropdown />}
    </header>
  );
};

export default Navbar;
