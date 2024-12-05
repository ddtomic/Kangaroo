import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

LikeNotification.propTypes = {
  name: propTypes.string,
  date: propTypes.string,
  user: propTypes.string,
  threadurl: propTypes.string,
  threadName: propTypes.string,
};

function LikeNotification(props) {
  return (
    <div>
      <Link to={props.threadurl}>
        <li>
          <div className="liked-container">
            <div className="liked-top">
              <h5>
                <b>{props.name}</b>
              </h5>
              <h5 style={{ color: "black" }}>{props.date}</h5>
            </div>
            <div className="liked-bottom">
              <h5 style={{ color: "black" }}>
                {props.user} liked your comment in <b>{props.threadName}</b>!
              </h5>
            </div>
          </div>
        </li>
      </Link>
    </div>
  );
}

export default LikeNotification;
