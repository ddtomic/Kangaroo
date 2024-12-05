import React, { useState, useContext, useEffect } from "react";
import "../CSS/Components/Dropdown.css";
import LikeNotification from "../Props/LikeNotification";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

const Dropdown = () => {
  const [DropDown, setDropDown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const { authState } = useContext(AuthContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the incoming date string
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const getNotifs = async () => {
    await axios
      .get(`http://localhost:3002/auth/notifications/${authState.id}`)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const urlSetup = (threadID, threadTitle) => {
    if (threadID) {
      let final =
        "/" + threadID.toString() + "/" + threadTitle.replace(/\s+/g, "_");
      return final;
    } else {
      return;
    }
  };

  useEffect(() => {
    getNotifs();
  }, []);

  return (
    <div className="notify">
      <div className="dropdown">
        <ul className="notify-list">
          {notifications.map((values, key) => {
            return (
              <LikeNotification
                name={authState.username}
                date={formatDate(values.updatedAt)}
                user={
                  values.type === "c"
                    ? values.userCommentRate.username
                    : values.userThreadRate.username
                }
                threadurl={
                  values.type === "c"
                    ? urlSetup(
                        values.commentRating.threadComments.threadID,
                        values.commentRating.threadComments.title
                      )
                    : urlSetup(
                        values.threadRatings.threadID,
                        values.threadRatings.title
                      )
                }
                threadName={
                  values.type === "c"
                    ? values.commentRating.threadComments.title
                    : values.threadRatings.title
                }
                type={values.type}
                key={key}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
