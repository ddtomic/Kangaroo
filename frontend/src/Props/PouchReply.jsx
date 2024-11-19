import React from "react";
import propTypes from "prop-types";

PouchReply.propTypes = {
  name: propTypes.string,
  comment: propTypes.string,
  replycount: propTypes.number,
};

function PouchReply(prop) {
  return (
    <div>
      <div className="comment-container">
        <div className="top-comment">
          <div className="bottom-comment">
            <h5 className="comment-username">{prop.name}</h5>
            <h3 className="comment-comment">{prop.comment} </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PouchReply;
