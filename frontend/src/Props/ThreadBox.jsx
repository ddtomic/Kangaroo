import React, { useEffect, useState } from "react";
import like from "../assets/images/like.png";
import dislike from "../assets/images/dislike.png";
import propTypes from "prop-types";
import message from "../assets/images/message.png";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import "../CSS/Props/ThreadBox.css";
import { useNavigate } from "react-router-dom";

function ThreadBox(props) {
  const { refreshThread } = props;
  ThreadBox.propTypes = {
    threadID: propTypes.number,
    name: propTypes.string,
    title: propTypes.string,
    timestamp: propTypes.string,
    replyCount: propTypes.number,
    score: propTypes.number,
    isLiked: propTypes.string,
  };
  const { authState } = useContext(AuthContext);
  const navTo = useNavigate();

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
        refreshThread();
      })
      .catch((error) => {
        console.log("Thread could not be liked:", error);
      });
  };

  const urlSetup = (currThread) => {
    let final =
      props.threadID.toString() + "/" + currThread.replace(/\s+/g, "_");
    return final;
  };

  return (
    <div>
      <li className="row">
        <a href={urlSetup(props.title)}>
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
                }}
                className={`likeBtn ${props.isLiked === "l" ? "liked" : ""}`}
                disabled={props.isLiked === "g"}
              >
                <img src={like} alt="like-img" />
              </button>
            </div>
            <div className="middle-feedback">
              <p>{props.score}</p>
            </div>
            <div className="right-feedback">
              <button
                onClick={() => {
                  rateThread("d");
                }}
                className={`dislikeBtn ${
                  props.isLiked === "d" ? "disliked" : ""
                }`}
                disabled={props.isLiked === "g"}
              >
                <img src={dislike} alt="dislike-img" />
              </button>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

export default ThreadBox;
