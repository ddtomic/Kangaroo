import React, { useState } from "react";
import "../CSS/Components/Navbar.css";
import Dropdown from "./Dropdown.jsx";
import usericonwhite from "../assets/images/usericonwhite.png";
import bell from "../assets/images/bell.png";
import logout from "../assets/images/logout.png";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import addUser from "../assets/images/add-user.png";
import kangaroo from "../assets/images/kgroo.png";
import { Link } from "react-router-dom";

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
      <Link to="/home" className="logo">
        <img src={kangaroo}></img>
        Kangaroo
      </Link>
      {authState.status ? (
        <nav className="navbar">
          <p>{authState.username}</p>

          <Link
            className="navbar-username"
            to={`/${authState.id}/${authState.username}`}
          >
            <img src={usericonwhite} alt="user-icon-white"></img>
          </Link>

          <a
            className="notification"
            onClick={() => setDropDown((prev) => !prev)}
          >
            <img src={bell} alt="notification-bell"></img>
          </a>
          <Link className="log-out" to="/signup">
            <img
              src={logout}
              alt="logout-image"
              onClick={() => signOut()}
            ></img>
          </Link>
        </nav>
      ) : (
        <div className="signUpBtn">
          <Link to="/signup">
            <img src={addUser} alt="add-user"></img>
          </Link>
        </div>
      )}

      {DropDown && <Dropdown />}
    </header>
  );
};

export default Navbar;
