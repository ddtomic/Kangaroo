import React from "react";
import propTypes from "prop-types";
import '../CSS/Props/Pouch.css'


Pouch.propTypes = {
  name: propTypes.string,
  comment: propTypes.string,
  title: propTypes.string,
  timestamp: propTypes.string,
  replycount: propTypes.number,
  likecount: propTypes.number,
};

function Pouch(prop) {
  return (
    <div className="pouch-container">
      <div>
      <div className="top-pouch">
        <h3 className="pouch-username">{prop.name}</h3>
          <h2 className="pouch-title">{prop.title}</h2>
          <div className="pouch-feedback">
            <h5 className="pouch-timestamp">{prop.timestamp}</h5>
            <h5 className="pouch-replycount">{prop.replycount} replies</h5>
            <h5 className="pouch-likecount">{prop.likecount} likes</h5>
          </div>
      </div>
        <div className="bottom-pouch">
          <h3 className="pouch-comment">{prop.comment}</h3>
        </div>
      </div>
    </div>
  );
}

export default Pouch;
