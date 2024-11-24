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


Pouch.propTypes = {
  name: propTypes.string,
  threadID: propTypes.number,
  comment: propTypes.string,
  title: propTypes.string,
  timestamp: propTypes.string,
  replycount: propTypes.number,
  likecount: propTypes.number,
  isLiked: propTypes.string,
};

function Pouch(prop) {
  const { refreshRating } = prop;
  const { authState } = useContext(AuthContext);

  const rateThread = (rate) => {
    axios
      .post("http://18.119.120.175:3002/rate/thread", {
        userID: authState.id,
        threadID: prop.threadID,
        rating: rate,
      })
      .then((response) => {
        if (rate === "l") {
          console.log("Like:", response.data);
        } else {
          console.log("Dislike:", response.data);
        }
        refreshRating();
      })
      .catch((error) => {
        console.log("Thread could not be liked:", error);
      });
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
            <div className="right-pouch">
              <div>
                <button
                  onClick={() => {
                    rateThread("l");
                    console.log(prop.likecount);
                  }}
                  className={`likePouch ${prop.isLiked === "l" ? "liked" : ""}`}
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
                    console.log(prop.likecount);
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
            <div className="pouch-comment">
              <img src={message} alt="pouch-message"></img>
              <p>{prop.replycount}</p>

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
