import React from "react";
import Navbar from "../Components/Navbar";
import like from "../assets/images/like.png";
import dislike from "../assets/images/dislike.png";
import message from "../assets/images/message.png";
import "./PouchPage.css";
import PouchReply from "../Props/PouchReply";
import Pouch from "../Props/Pouch";
import propTypes from "prop-types";

PouchPage.propTypes = {
  name: propTypes.string,
  comment: propTypes.string,
  title: propTypes.string,
  timestamp: propTypes.string,
  replycount: propTypes.number,
  likecount: propTypes.number,
  comments: propTypes.arrayOf(propTypes.object),
};

function PouchPage(props) {
  return (
    <div className="pouch-background">
      <Navbar />
      <Pouch
        name={props.name}
        comment={props.comment}
        title={props.title}
        timestamp={props.timestamp}
        replycount={props.replycount}
        likecount={props.likecount}
      />
      {props.comments.map((value, key) => {
        <PouchReply
          name={"test"}
          comment={"this is a test"}
          replycount={props.replycount.length}
          key={key}
        />;
      })}

      <div className="reply-container">
        <h2>Reply</h2>
        <input
          className="pouch-input"
          type="text"
          placeholder="Add as many details as possible. By doing so you will get the best responses."
        />
        <button className="pouch-button">Send</button>
      </div>
    </div>
  );
}

export default PouchPage;
