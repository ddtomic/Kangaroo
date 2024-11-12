import React from 'react'
import './Dropdown.css'
import CommentNotification from '../Props/CommentNotification'
import LikeNotification from '../Props/LikeNotification'

const Dropdown = () => {
  return (
    <div className='notify'>
        <div className="dropdown">
            <ul className='notify-list'>
               <CommentNotification name='Ben' date='11/11/2024' user='dejan' ></CommentNotification>
               <CommentNotification name='Josue' date='11/11/2024' user='Ben' ></CommentNotification>
               <LikeNotification name='Ayham' date='11/11/2024' user='josue'></LikeNotification>
               <CommentNotification name='Ben' date='11/11/2024' user='Ayham' ></CommentNotification>
               <LikeNotification name='Dejan' date='11/11/2024' user='josue'></LikeNotification>
            </ul>
        </div>
    </div>
  )
}

export default Dropdown