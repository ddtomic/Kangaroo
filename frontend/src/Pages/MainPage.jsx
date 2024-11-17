import axios from "axios";
import React from "react";
import "./MainPage.css";
import Navbar from "../Components/Navbar";
import design from "../assets/images/pngegg.png";
import search from "../assets/images/icons8-search-50.png";
import ThreadBox from "../Props/ThreadBox";
import { Link } from "react-router-dom";
import Leaderbaord from "../Props/Leaderboard";
import './CreatePage.css'
import { useState, useEffect } from "react";

const MainPage = () => {
  const [threadList, setThreadList] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the incoming date string
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  useEffect(() => {
    console.log("Fetching threads...");
    axios.get("http://18.119.120.175:3002/thread/date").then((response) => {
      setThreadList(response.data);
    });
  }, [setThreadList]);

  return (
    <div className="main">
      <Navbar />
      <div className="upper-body">
        <img src={design} alt="background-image"></img>
        <p>Welcome to Kangaroo!</p>
        <div className="upper-search">
          <img src={search} alt="search-img"></img>
          <input type="text" placeholder="Search Roo..." />
        </div>
      
        <div className="middle-body">
            <p className="middle-p">
              Collaborate with a community of creators who are building the future
              of online conversations
            </p>
              <div className="roo-header">
                <p>Roo's</p>
              </div>
            <div className="roo-catagories">
              <a href='/'>Most liked</a>
              <a href='/'>Most Commented</a>
              <a href='/'>Most Relavent</a>
            </div>
            <div className="middle-container">

              <div className="left-container">
                <Leaderbaord name='bem' count='3'></Leaderbaord>
              </div>

               <div className="container">
                        {threadList.map((value, key) => {
                          console.log(value);
                          return (
                            <ThreadBox
                              key={key}
                              name={value.userThread.username}
                              title={value.title}
                              timestamp={formatDate(value.createdAt)}
                              commentcount={value.commentCount}
                              ratingcount={value.threadRatings.length}
                            ></ThreadBox>
                          );
                        })}
                      </div>

                  <div className="right-container">
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
              </div>
            </div>

        <footer className="lower-body">
          <div className="top-footer">
            <p>About us</p>
            <h1>
              We are computer engineering students making a forum website for
              users to come and interact with one another. This project is for
              our CS 44200 class and we hope you enjoy!
            </h1>

          </div>
        </div>
      </div>

      <footer className="lower-body">
        <div className="top-footer">
          <p>About us</p>
          <h1>
            We are computer engineering students making a forum website for
            users to come and interact with one another. This project is for our
            CS 44200 class and we hope you enjoy!
          </h1>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
