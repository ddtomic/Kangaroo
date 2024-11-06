import React from 'react'
import like from '../assets/images/like.png'
import dislike from '../assets/images/dislike.png'
import propTypes from 'prop-types'
import message from '../assets/images/message.png'

ThreadBox.propTypes = {
  name: propTypes.string,
  title: propTypes.string,
  timestamp: propTypes.string,
  ratingcount: propTypes.number,
  commentcount: propTypes.number
}

function ThreadBox(props) {
  return (
    <div> <li className="row">
    <a href="#">
      <h4 className="username">{props.name}</h4>
      <h5 className="timestamp">{props.timestamp}</h5>
      <h2 className="title">{props.title}</h2>
      <div className="bottom">
        <p className="comment-count">
          <img src={message}></img>
          {props.commentcount}
        </p>
        <div className="feedback">
          <div className="left-feedback">
          <img src={like} alt="like-img"></img>
          </div>
          <div className="middle-feedback">
            <p>{props.ratingcount}</p>
          </div>
          <div className="right-feedback">
          <img src={dislike} alt="like-img"></img>
          </div>
        </div>
      </div>
    </a>
  </li></div>
  )
}

export default ThreadBox