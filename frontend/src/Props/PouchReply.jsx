import React, { useState, useContext, useEffect } from "react";
import propTypes from "prop-types";
import "../CSS/Props/PouchReply.css";
import like from "../assets/images/like.png";
import dislike from "../assets/images/dislike.png";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import trash from "../assets/images/trash-bin.png";
import shuffle from "../assets/images/shuffle-arrows.png";
import { Link } from "react-router-dom";

PouchReply.propTypes = {
  name: propTypes.string,
  comment: propTypes.string,
  date: propTypes.string,
  likes: propTypes.number,
  commentID: propTypes.number,
  rating: propTypes.string,
  pfp: propTypes.number,
};

function PouchReply(prop) {
  const { refreshComments } = prop;
  const [commentScore, setCommentScore] = useState(0);
  const { authState } = useContext(AuthContext);

  const rateComment = async (rating) => {
    axios
      .post("https://kangarooo.click:3002/rate/comment", {
        userID: authState.id,
        commentID: prop.commentID,
        rating: rating,
      })
      .then((response) => {
        ratingRefresh();
        refreshComments();
      })
      .catch((error) => {
        console.log("Could not rate comment:", error);
      });
  };
  const getRatings = async () => {
    axios
      .get(`https://kangarooo.click:3002/rate/commentrates/${prop.commentID}`)
      .then((response) => {
        return setCommentScore(response.data.score);
      })
      .catch((error) => {
        return console.log("Could not get comment score:", error);
      });
  };

  const delComment = async () => {
    await axios
      .delete(`https://kangarooo.click:3002/comment/comments/${prop.commentID}`)
      .then((response) => {
        console.log(response.data);
      });

    refreshComments();
  };

  const ratingRefresh = async () => {
    getRatings();
  };

  useEffect(() => {
    getRatings();
  }, []);

  return (
    <div className="comment-container">
      <div className="left-pouch">
        <div className="top-comment">
          <div className="top-comment-picture">
            <img src={`/assets/${prop.pfp}.jpg`} alt="shuffle-img"></img>
            <Link to={`/${prop.userID}/${prop.name}`} className="profile-route">
              <h3 className="comment-username">{prop.name}</h3>
            </Link>
          </div>
          <h4 className="date-comment">{prop.date}</h4>
        </div>
        <div className="bottom-comment">
          <h3 className="comment-comment">{prop.comment}</h3>
        </div>
      </div>

      <div className="right-pouch">
        <div className="right-pouch-feedback">
          <div>
            <button
              onClick={() => {
                rateComment("l");
              }}
              className={`likePouch ${prop.rating === "l" ? "liked" : ""}`}
              disabled={prop.rating === "g"}
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
              }}
              className={`dislikePouch ${
                prop.rating === "d" ? "disliked" : ""
              }`}
              disabled={prop.rating === "g"}
            >
              <img src={dislike} alt="dislike-pouch-btn"></img>
            </button>
          </div>
        </div>
        <div className="left-pouch-feedback">
          {prop.userID === authState.id ? (
            <button onClick={() => delComment()}>
              <img src={trash} alt="trash-image"></img>
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default PouchReply;
