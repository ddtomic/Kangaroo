import React, { useState } from "react";
import "../CSS/Components/Navbar.css";
import Dropdown from "./Dropdown.jsx";
import usericonwhite from "../assets/images/usericonwhite.png";
import bell from "../assets/images/bell.png";
import logout from "../assets/images/logout.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import addUser from '../assets/images/add-user.png'

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
      <a href="*" className="logo">
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
          <a className="log-out" href="/signup">
            <img
              src={logout}
              alt="logout-image"
              onClick={() => signOut()}
            ></img>
          </a>
        </nav>
      ) : (
        <div className="signUpBtn">
          <a href="/signup"><img src={addUser} alt='add-user'></img></a>
        </div>
      )}

      {DropDown && <Dropdown />}
    </header>
  );
};

export default Navbar;
