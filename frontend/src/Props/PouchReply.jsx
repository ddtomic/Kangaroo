import React from "react";
import propTypes from "prop-types";
import "../CSS/Props/PouchReply.css";

PouchReply.propTypes = {
  name: propTypes.string,
  comment: propTypes.string,
  date: propTypes.string,
  likes: propTypes.number,
};

function PouchReply(prop) {
  return (
    <div className="comment-container">
      <div className="top-comment">
        <h3 className="comment-username">{prop.name}</h3>
        <h3 className="comment-comment">{prop.comment} </h3>
      </div>
      <div className="bottom-comment">
        <h4 className="date-comment">{prop.date}</h4>
        <h4>{0} likes</h4>
      </div>
    </div>
  );
}

export default PouchReply;
