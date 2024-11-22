import React, { useEffect, useState } from "react";
import like from "../assets/images/like.png";
import dislike from "../assets/images/dislike.png";
import propTypes from "prop-types";
import message from "../assets/images/message.png";
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
    replyCount: propTypes.number,
  };

  const [threadScore, setThreadScore] = useState(0);
  const { authState } = useContext(AuthContext);

  const [isClicked, setIsClicked] = useState(null);

  const handleClick = (buttonID) => {
    setIsClicked(buttonID);
  };

  const getRatings = async () => {
    axios
      .get(`http://18.119.120.175:3002/rate/threadrates/${props.threadID}`)
      .then((response) => {
        return setThreadScore(response.data.score);
      })
      .catch((error) => {
        return console.log("Could not get thread score:", error);
      });
  };

  const ratingRefresh = async () => {
    getRatings();
  };

  const rateThread = (rate) => {
    axios
      .post("http://18.119.120.175:3002/rate/thread", {
        userID: authState.id,
        threadID: props.threadID,
        rating: rate,
      })
      .then((response) => {
        if (rate === "l") {
          console.log("Like:", response.data);
        } else {
          console.log("Dislike:", response.data);
        }
        ratingRefresh();
      })
      .catch((error) => {
        console.log("Thread could not be liked:", error);
      });
  };

  useEffect(() => {
    getRatings();
  }, []);

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
                <p>{props.replyCount}</p>
              </div>
            </div>
          </div>
        </a>
        <div className="bottom">
          <div className="feedback">
            <div className="left-feedback">
              <button
                onClick={() => {
                  rateThread("l");
                  handleClick(1);
                }}
                className={`likeBtn ${isClicked === 1 ? "liked" : ""}`}
              >
                <img src={like} alt="like-img" />
              </button>
            </div>
            <div className="middle-feedback">
              <p>{threadScore}</p>
            </div>
            <div className="right-feedback">
              <button
                onClick={() => {
                  rateThread("d");
                  handleClick(2);
                }}
                className={`dislikeBtn ${isClicked === 2 ? "disliked" : ""}`}
              >
                <img src={dislike} alt="dislike-img" />
              </button>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
});

export default ThreadBox;
