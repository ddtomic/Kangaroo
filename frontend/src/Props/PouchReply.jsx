import React, { useState } from "react";
import propTypes from "prop-types";
import "../CSS/Props/PouchReply.css";
import like from '../assets/images/like.png'
import dislike from '../assets/images/dislike.png'

PouchReply.propTypes = {
  name: propTypes.string,
  comment: propTypes.string,
  date: propTypes.string,
  likes: propTypes.number,
};

function PouchReply(prop) {

  const [ pouchClicked, setPouchClicked ] = useState(null); 

  const handleClick = (buttonID) => {
    setPouchClicked(buttonID); 
  }

  return (
    <div className="comment-container">
      <div className="left-pouch">
        <div className="top-comment">
          <h3 className="comment-username">{prop.name}</h3>
          <h4 className="date-comment">{prop.date}</h4>
        </div>
        <div className="bottom-comment">
         <h3 className="comment-comment">{prop.comment}</h3>
        </div>
      </div>
      <div className="right-pouch">
        <div>
          <button onClick={() => handleClick(1)} className={`likePouch ${pouchClicked === 1 ? 'liked' : ''}`}><img src={like} alt='like-pouch-btn'></img></button>
        </div>
        <div>
          <p>23</p>
        </div>
        <div>
        <button onClick={() =>handleClick(2)} className={`dislikePouch ${pouchClicked === 2 ? 'disliked' : ''}`}><img src={dislike} alt='dislike-pouch-btn'></img></button>
        </div>
      </div>
    </div>
  );
}

export default PouchReply;
