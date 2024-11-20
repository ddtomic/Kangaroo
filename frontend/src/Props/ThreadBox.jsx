import React from "react";
import like from "../assets/images/like.png";
import dislike from "../assets/images/dislike.png";
import propTypes from "prop-types";
import message from "../assets/images/message.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import "../CSS/Props/ThreadBox.css";

const ThreadBox = React.memo((props) => {
  ThreadBox.propTypes = {
    threadID: propTypes.number,
    name: propTypes.string,
    title: propTypes.string,
    timestamp: propTypes.string,
    ratingcount: propTypes.number,
    commentcount: propTypes.number,
  };
  const { authState } = useContext(AuthContext);
  //console.log(props.title.substring(0, props.title.size || 10));
  const rateThread = (rate) => {
    console.log({
      userID: authState.id,
      threadID: props.threadID,
      rating: rate,
    });
    axios
      .post("http://18.119.120.175:3002/rate/", {
        userID: authState.id,
        threadID: props.threadID,
        rating: rate,
      })
      .then(() => {
        if (rate === "l") {
          console.log("Thread liked");
        } else {
          console.log("Thread disliked");
        }
        window.location.reload();
      })
      .catch((error) => {
        console.log("Thread could not be liked:", error);
      });
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
        </a>
        <div className="bottom">
          <div className="feedback">
            <div className="like-feedback">
              <div className="like-feedback">
                <div className="left-feedback">
                  <button onClick={() => rateThread("l")}>
                    <img src={like} alt="like-img" />
                  </button>
                </div>
                <div className="middle-feedback">
                  <p>{props.ratingcount}</p>
                </div>
                <div className="right-feedback">
                  <button onClick={() => rateThread("d")}>
                    <img src={dislike} alt="dislike-img" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
});

export default ThreadBox;
