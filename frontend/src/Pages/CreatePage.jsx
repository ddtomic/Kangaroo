import React from 'react'
import Navbar from '../Components/Navbar'
import './CreatePage.css'

const CreatePage = () => {
  return (
    <div className='create-background'>
      <Navbar/>
      <div className="create-container">
        <h2>New Conversation</h2>
        <h4>Ask a question, start a discussion or start an idea.</h4>
        <p>Title</p>
        <input className='title-input' type='text' placeholder='Enter title here'></input>
        <p>Description</p>
        <input className='desc-input' type='text' placeholder='Add as many details as possible. By doing so you will get the best responses.'></input>
        <button className='create-button'>Create</button>
      </div>
    </div>
  )
}

export default CreatePage
