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
import { Link } from 'react-router-dom';

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
    pathTo: propTypes.string,
    pfp: propTypes.number,
    main: propTypes.bool,
  };
  const { authState } = useContext(AuthContext);

  const rateThread = (rate) => {
    axios
      .post("http://localhost:3002/rate/thread", {
        userID: authState.id,
        threadID: props.threadID,
        rating: rate,
      })
      .then((response) => {
        refreshThread();
      })
      .catch((error) => {
        console.log("Thread could not be liked:", error);
      });
  };

  const urlSetup = (currThread) => {
    if (props.threadID) {
      let final =
        "/" + props.threadID.toString() + "/" + currThread.replace(/\s+/g, "_");
      return final;
    } else {
      return;
    }
  };

  return (
    <div>
      <li className="row">
        <Link to={urlSetup(props.title)}>
          <div className="top">
            <div className="user-picture">
              <img src={`/assets/${props.pfp}.jpg`} alt="shuffle"></img>
              <h4 className="username">{props.name}</h4>
            </div>

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
        </Link>
        <div className="bottom">
          <div className="feedback">
            <div className="left-feedback">
              {props.main ? (
                <button
                  onClick={() => {
                    rateThread("l");
                  }}
                  className={`likeBtn ${props.isLiked === "l" ? "liked" : ""}`}
                  disabled={props.isLiked === "g"}
                >
                  <img src={like} alt="like-img" />
                </button>
              ) : (
                <></>
              )}
            </div>
            <div className="middle-feedback">
              <p>{props.score}</p>
            </div>
            <div className="right-feedback">
              {props.main ? (
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
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

export default ThreadBox;
