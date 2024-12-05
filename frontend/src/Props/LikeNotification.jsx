import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import "../CSS/Props/LikeNotifications.css";

LikeNotification.propTypes = {
  name: propTypes.string,
  date: propTypes.string,
  user: propTypes.string,
  threadurl: propTypes.string,
  threadName: propTypes.string,
  type: propTypes.string,
  pfp: propTypes.number
};

function LikeNotification(props) {
  return (
    <div>
      <Link to={props.threadurl}>

          <li>
            <div className="liked-container">
              <div className="liked-top">
                <h5 style={{ color: "black" }}>{props.date}</h5>
              </div>
              <div className="liked-bottom">
              {props.type === "c" ?(<h5 style={{ color: "black" }}>
                  <img src={`/assets/${props.pfp}.jpg`} alt="error"></img><b>{props.user}</b> liked your comment in <b>{props.threadName}</b>!
                </h5>):(<h5 style={{ color: "black" }}>
                  <img src={`/assets/${props.pfp}.jpg`} alt="error"></img><b>{props.user}</b> liked your thread, <b>{props.threadName}</b>!
                </h5>)}
                
              </div>
            </div>
          </li>
        
      </Link>
    </div>
  );
}

export default LikeNotification;
