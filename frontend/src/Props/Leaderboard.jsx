import React from "react";
import propTypes from "prop-types";
import "../CSS/Props/Leaderboard.css";
import "../CSS/Props/ThreadBox.css";

Leaderbaord.propTypes = {
  name: propTypes.string,
  count: propTypes.string,
  pfp: propTypes.number,
  userID: propTypes.number,
};

function Leaderbaord(prop) {
  return (
    <div>
      <li className="leaderboard-row">
        <div className="leaderboard-items">
          <div className="user-picture">
            <img src={`/assets/${prop.pfp}.jpg`} alt="shuffle"></img>
          </div>
          <p className="counter">{prop.count}</p>
          <a className="leaderboard-link" href={`/${prop.userID}/${prop.name}`}>
            {prop.name}
          </a>
        </div>
      </li>
    </div>
  );
}

export default Leaderbaord;
