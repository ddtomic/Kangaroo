import React from 'react'
import Navbar from '../Components/Navbar'
import like from '../assets/images/like.png'
import dislike from '../assets/images/dislike.png'
import message from '../assets/images/message.png'
import './PouchPage.css'
import PouchReply from '../Props/PouchReply'
import Pouch from '../Props/Pouch'

const PouchPage = () => {
  return (
    <div className="pouch-background">
        <Navbar/>
        <div className="pouch-container">
          <Pouch title='Went on a run' timestamp='22/34/3453' replycount='3' likecount='4'
          name='Quadspy' comment=' the heavy rain that soaked the streets and made the evening air thick with mist, people continued to bustle about, huddling under umbrellas or seeking shelter in the nearby cafes, where the warm light from the windows spilled out onto the wet pavement, reflecting the vibrant energy of the city as if it were trying to shake off the melancholy brought by the weather, and yet, there was an undeniable sense of calm that settled over the scene, a quiet serenity that seemed to slow time for just a moment'></Pouch>
        </div>
        <div className="comment-container">
        <div className="top-comment">
          <h2>3 Replies</h2>
          </div>
            <PouchReply name='Quadspy' comment='hThe rain tapped softly against the window, a soothing rhythm that filled the quiet room. In that stillness, everything felt calm and connected, as if the world outside had slowed down just for a moment.' ></PouchReply>
            <PouchReply name='Quadspy' comment='The rain tapped softly against the window, a soothing rhythm that filled the quiet room. In that stillness, everything felt calm and connected, as if the world outside had slowed down just for a moment.' ></PouchReply>
            <PouchReply name='Quadspy' comment='The sky was painted with shades of pink and orange as the sun set behind the mountains. It was a moment of peaceful solitude, reminding me how beautiful the world can be when we pause to notice it.' ></PouchReply>
        </div>
        <div className="reply-container">
          <h2>Reply</h2>
          <input className='pouch-input' type="text" placeholder="Add as many details as possible. By doing so you will get the best responses." />
          <button className='pouch-button'>Send</button>
        </div>
    </div>
  )
}

export default PouchPage