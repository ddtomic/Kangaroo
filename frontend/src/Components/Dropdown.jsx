import React, { useState } from "react";
import "../CSS/Components/Dropdown.css";
import CommentNotification from "../Props/CommentNotification";
import LikeNotification from "../Props/LikeNotification";
import axios from "axios";

const Dropdown = () => {
  const [DropDown, setDropDown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const getNotifs = async () => {
    await axios.get("http://localhost:3002/auth/notifs");
  };

  return (
    <div className="notify">
      <div className="dropdown">
        <ul className="notify-list">
          <CommentNotification
            name="Ben"
            date="11/11/2024"
            user="dejan"
          ></CommentNotification>
          <CommentNotification
            name="Josue"
            date="11/11/2024"
            user="Ben"
          ></CommentNotification>
          <LikeNotification
            name="Ayham"
            date="11/11/2024"
            user="josue"
          ></LikeNotification>
          <CommentNotification
            name="Ben"
            date="11/11/2024"
            user="Ayham"
          ></CommentNotification>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
