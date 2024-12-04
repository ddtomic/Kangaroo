import React, { useState } from "react";
import propTypes from "prop-types";
import "../CSS/Props/Pouch.css";
import like from "../assets/images/like.png";
import dislike from "../assets/images/dislike.png";
import "../CSS/Props/PouchReply.css";
import message from "../assets/images/message.png";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import trash from "../assets/images/trash-bin.png";
import { useNavigate } from "react-router-dom";

Pouch.propTypes = {
  name: propTypes.string,
  userID: propTypes.number,
  threadID: propTypes.number,
  comment: propTypes.string,
  title: propTypes.string,
  timestamp: propTypes.string,
  replycount: propTypes.number,
  likecount: propTypes.number,
  isLiked: propTypes.string,
  pfp: propTypes.number,
};

function Pouch(prop) {
  const { refreshRating } = prop;
  const { authState } = useContext(AuthContext);
  const navTo = useNavigate();
  const rateThread = (rate) => {
    axios
      .post("http://localhost:3002/rate/thread", {
        userID: authState.id,
        threadID: prop.threadID,
        rating: rate,
      })
      .then((response) => {
        refreshRating();
      })
      .catch((error) => {
        console.log("Thread could not be liked:", error);
      });
  };

  const delThread = async () => {
    await axios
      .delete(`http://localhost:3002/thread/threads/${prop.threadID}`)
      .then((response) => {
        console.log(response.data);
      });
    navTo("/home");
  };

  return (
    <div className="pouch-container">
      <div>
        <div className="top-pouch">
          <div className="pouch-info">
            <div>
              <div className="pouch-info-picture">
                <img
                  className="profile-img"
                  src={`/assets/${prop.pfp}.jpg`}
                  alt="shuffle-img"
                ></img>
                <a
                  href={`/${prop.userID}/${prop.name}`}
                  className="profile-route"
                >
                  <h3 className="pouch-username">{prop.name}</h3>
                </a>
              </div>
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
                        rateThread("l");
                      }}
                      className={`likePouch ${
                        prop.isLiked === "l" ? "liked" : ""
                      }`}
                      disabled={prop.isLiked === "g"}
                    >
                      <img src={like} alt="like-pouch-btn"></img>
                    </button>
                  </div>
                  <div>
                    <p>{prop.likecount}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        rateThread("d");
                      }}
                      className={`dislikePouch ${
                        prop.isLiked === "d" ? "disliked" : ""
                      }`}
                      disabled={prop.isLiked === "g"}
                    >
                      <img src={dislike} alt="dislike-pouch-btn"></img>
                    </button>
                  </div>
                </div>
              </div>
              <div className="pouch-comment">
                <img src={message} alt="pouch-message"></img>
                <p>{prop.replycount}</p>
              </div>
            </div>
            <div className="left-pouch-feedback">
              {prop.userID === authState.id ? (
                <button onClick={() => delThread()}>
                  <img src={trash} alt="trash-image"></img>
                </button>
              ) : (
                <></>
              )}
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
