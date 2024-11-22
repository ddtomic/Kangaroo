import React, { useState, useContext, useEffect } from "react";
import propTypes from "prop-types";
import "../CSS/Props/PouchReply.css";
import like from "../assets/images/like.png";
import dislike from "../assets/images/dislike.png";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

PouchReply.propTypes = {
  name: propTypes.string,
  comment: propTypes.string,
  date: propTypes.string,
  likes: propTypes.number,
  commentID: propTypes.number,
};

function PouchReply(prop) {
  const [pouchClicked, setPouchClicked] = useState(0);
  const [commentScore, setCommentScore] = useState(0);
  const { authState } = useContext(AuthContext);

  const rateComment = async (rating) => {
    axios
      .post("http://18.119.120.175:3002/rate/comment", {
        userID: authState.id,
        commentID: prop.commentID,
        rating: rating,
      })
      .then((response) => {
        if (rating === "l") {
          console.log("Like:", response.data);
        } else {
          console.log("Dislike:", response.data);
        }
        ratingRefresh();
      })
      .catch((error) => {
        console.log("Could not rate comment:", error);
      });
  };

  const getRatings = async () => {
    axios
      .get(`http://18.119.120.175:3002/rate/commentrates/${prop.commentID}`)
      .then((response) => {
        return setCommentScore(response.data.score);
      })
      .catch((error) => {
        return console.log("Could not get comment score:", error);
      });
  };

  const ratingRefresh = async () => {
    getRatings();
  };

  const handleClick = (buttonID) => {
    setPouchClicked(prev => prev === buttonID ? 0 : buttonID);
  };

  useEffect(() => {
    getRatings();
  }, []);

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
          <button
            onClick={() => {
              rateComment("l");
              handleClick(1);
            }}
            className={`likePouch ${pouchClicked === 1 ? "liked" : ""}`}
          >
            <img src={like} alt="like-pouch-btn"></img>
          </button>
        </div>
        <div>
          <p>{commentScore}</p>
        </div>
        <div>
          <button
            onClick={() => {
              rateComment("d");
              handleClick(2);
            }}
            className={`dislikePouch ${pouchClicked === 2 ? "disliked" : ""}`}
          >
            <img src={dislike} alt="dislike-pouch-btn"></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PouchReply;
