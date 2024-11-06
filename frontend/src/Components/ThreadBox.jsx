import React from 'react'
import like from '../assets/images/icons8-like-64.png'
import propTypes from 'prop-types'

ThreadBox.propTypes = {
  name: propTypes.string,
  title: propTypes.string,
  timestamp: propTypes.string,
  ratingcount: propTypes.number,
  commentcount: propTypes.number
}

function ThreadBox(props) {
  return (
    <div><li className="row">
    <a href='/'>
      <h5 className="username">{props.name}</h5>
      <h2 className="title">
          {props.title}
      </h2>
      <div className="bottom">
        <p className="timestamp">11/5/2024</p>
        <div className="feedback">
        <img src={like} alt='like-img'></img>
        <p className="comment-count">{props.commentcount} comments</p>
        </div>
      </div>
    </a>
  </li></div>
  )
}

export default ThreadBox