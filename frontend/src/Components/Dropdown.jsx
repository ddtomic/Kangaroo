
import React, { useState } from 'react'
import '../CSS/Components/Dropdown.css'
import CommentNotification from '../Props/CommentNotification'
import LikeNotification from '../Props/LikeNotification'
import close from '../assets/images/close.png'


const Dropdown = () => {
  const [ DropDown, setDropDown ] = useState(false);
  return (
    <div className='notify'>
      
        <div className="dropdown">
          <div className="close-dropdown">
         <a onClick={() => setDropDown((prev) => !prev)}><img src={close} alt='close-image'></img></a>
          </div>
            <ul className='notify-list'>
               <CommentNotification name='Ben' date='11/11/2024' user='dejan' ></CommentNotification>
               <CommentNotification name='Josue' date='11/11/2024' user='Ben' ></CommentNotification>
               <LikeNotification name='Ayham' date='11/11/2024' user='josue'></LikeNotification>
               <CommentNotification name='Ben' date='11/11/2024' user='Ayham' ></CommentNotification>

            </ul>
        </div>
        
    </div>
  )
}

export default Dropdown