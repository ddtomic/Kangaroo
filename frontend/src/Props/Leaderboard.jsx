import React from "react";
import propTypes from "prop-types";
import "../CSS/Props/Leaderboard.css";
import "../CSS/Props/ThreadBox.css";
import { Link } from 'react-router-dom';


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
        <Link to={`/${prop.userID}/${prop.name}`}>
        <div className="leaderboard-items">
          <div className="user-picture">
            <img src={`/assets/${prop.pfp}.jpg`} alt="shuffle"></img>
            <div className="leaderboard-link" href={`/${prop.userID}/${prop.name}`}>
            {prop.name}
            </div>
          </div>
          <div><p className="counter">{prop.count}</p></div>
        </div>
        </Link>
      </li>
    </div>
  );
}

export default Leaderbaord;
