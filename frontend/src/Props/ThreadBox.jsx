import React from "react";
import like from "../assets/images/like.png";
import dislike from "../assets/images/dislike.png";
import propTypes from "prop-types";
import message from "../assets/images/message.png";
import { useNavigate } from "react-router-dom";

const ThreadBox = React.memo((props) => {
  ThreadBox.propTypes = {
    name: propTypes.string,
    title: propTypes.string,
    timestamp: propTypes.string,
    ratingcount: propTypes.number,
    commentcount: propTypes.number,
  };
  return (
    <div>
      <li className="row">
        <a href={props.title.substring(0, props.title.size || 10)}>
          <div className="top">
            <h4 className="username">{props.name}</h4>
            <h2 className="title">{props.title}</h2>
            <h5 className="timestamp">{props.timestamp}</h5>
            <div className="comment-feedback">
              <div className="left-comment">
                <img src={message} alt="message-img"></img>
              </div>
              <div className="right-comment">
                <p>{props.commentcount}</p>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="feedback">
              <div className="like-feedback">
                <div className="like-feedback">
                  <div className="left-feedback">
                    <img src={like} alt="like-img"></img>
                  </div>
                  <div className="middle-feedback">
                    <p>{props.ratingcount}</p>
                  </div>
                  <div className="right-feedback">
                    <img src={dislike} alt="dislike-img"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </li>
    </div>
  );
});

export default ThreadBox;
