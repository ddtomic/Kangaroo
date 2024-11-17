import { useEffect, React, useState } from "react";
import Navbar from "../Components/Navbar";
import like from "../assets/images/like.png";
import dislike from "../assets/images/dislike.png";
import message from "../assets/images/message.png";
import "./PouchPage.css";
import PouchReply from "../Props/PouchReply";
import Pouch from "../Props/Pouch";
import { useParams } from "react-router-dom";
import axios from "axios";

const PouchPage = () => {
  const [thread, setThread] = useState([]);
  let { threadTitle } = useParams();

  useEffect(() => {
    axios
      .get(`http://18.119.120.175:3002/thread/${threadTitle}`)
      .then((response) => {
        setThread(response);
      });
  }, []);
  return (
    <div className="pouch-background">
      <Navbar />
      <div className="pouch-container">
        <Pouch
          title={thread.title}
          timestamp={thread.createdAt}
          replycount={thread.commentCount}
          likecount={thread.ratingCount}
          name={thread.userThread.username}
          comment={thread.content}
        ></Pouch>
      </div>
      <div className="comment-container">
        <div className="top-comment">
          <h2>{thread.commentCount}</h2>
        </div>
        <PouchReply
          name="Quadspy"
          comment="hThe rain tapped softly against the window, a soothing rhythm that filled the quiet room. In that stillness, everything felt calm and connected, as if the world outside had slowed down just for a moment."
        ></PouchReply>
      </div>
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
};

export default PouchPage;
