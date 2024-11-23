import React, { useState } from "react";
import propTypes from "prop-types";
import '../CSS/Props/Pouch.css'
import like from '../assets/images/like.png'
import dislike from '../assets/images/dislike.png'
import '../CSS/Props/PouchReply.css'
import message from '../assets/images/message.png'
import trash from '../assets/images/trash-bin.png'


Pouch.propTypes = {
  name: propTypes.string,
  comment: propTypes.string,
  title: propTypes.string,
  timestamp: propTypes.string,
  replycount: propTypes.number,
  likecount: propTypes.number,
};

function Pouch(prop) {
  const [pouchClicked, setPouchClicked] = useState(0);

  const handleClick = (buttonID) => {
    setPouchClicked(prev => prev === buttonID ? 0 : buttonID);
  };
  return (
    <div className="pouch-container">
      <div>
          <div className="top-pouch">
            <div className="pouch-info">
                <div>
                  <h3 className="pouch-username">{prop.name}</h3>
                  <h2 className="pouch-title">{prop.title}</h2>
                </div>
                <div>
                  <h5 className="pouch-timestamp">{prop.timestamp}</h5>
                </div>
            </div>
              <div className="pouch-feedback">
              <div className="like-comment-feedback">
                  <div className="right-pouch">
                    <div className="right-pouch-feedback">
                      <div>
                        <button
                          onClick={() => {
                            
                            handleClick(1);
                          }}
                          className={`likePouch ${pouchClicked === 1 ? "liked" : ""}`}
                        >
                          <img src={like} alt="like-pouch-btn"></img>
                        </button>
                      </div>
                      <div>
                        <p>{prop.replycount}</p>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            
                            handleClick(2);
                          }}
                          className={`dislikePouch ${pouchClicked === 2 ? "disliked" : ""}`}
                        >
                          <img src={dislike} alt="dislike-pouch-btn"></img>
                        </button>
                      </div>
                    </div>   
                  </div>
                      <div className="pouch-comment">
                        <img src={message} alt='pouch-message'></img>
                        <p>{prop.replycount}</p>
                      </div>
              </div>
              <div className="left-pouch-feedback">
                <button>
                  <img src={ trash } alt='trash-image'></img>
                </button>
              </div>
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
