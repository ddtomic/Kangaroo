import axios from "axios";
import React from "react";
import "./MainPage.css";
import Navbar from "../Components/Navbar";
import design from "../assets/images/pngegg.png";
import search from "../assets/images/icons8-search-50.png";
import ThreadBox from "../Props/ThreadBox";
import { Link } from "react-router-dom";
import Leaderbaord from "../Props/Leaderboard";
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
  }, []);

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
      </div>

      <div className="middle-body">
        <p className="middle-p">
          Collaborate with a community of creators who are building the future
          of online conversations
        </p>
        <div className="roo-header">
          <p>Roo's</p>
          <Link to="/create">
            <button className="create-roo">Create Roo</button>
          </Link>
        </div>
        <div className="roo-catagories">
          <a href="/">Most liked</a>
          <a href="/">Most Commented</a>
          <a href="/">Most Relavent</a>
        </div>
        <div className="container">
          {threadList.map((value, key) => {
            return (
              <ThreadBox
                key={key}
                name={value.User.username}
                title={value.title}
                timestamp={formatDate(value.createdAt)}
                commentcount={45}
                ratingcount={45}
              ></ThreadBox>
            );
          })}
        </div>

        <div className="leaderboard-container">
          <div className="leaderboard">
            <p className="leaderboard-header">Most Liked</p>
            <Leaderbaord name="Ben" count={1}></Leaderbaord>
            <Leaderbaord name="Ayham"></Leaderbaord>
            <Leaderbaord name="Dejan"></Leaderbaord>
            <Leaderbaord name="Josue"></Leaderbaord>
            <Leaderbaord name="Ben" count={1}></Leaderbaord>
            <Leaderbaord name="Ayham"></Leaderbaord>
            <Leaderbaord name="Dejan"></Leaderbaord>
            <Leaderbaord name="Josue"></Leaderbaord>
          </div>
          <div className="leaderboard">
            <p className="leaderboard-header">Most Commented</p>
            <Leaderbaord name="Ben"></Leaderbaord>
            <Leaderbaord name="Ayham"></Leaderbaord>
            <Leaderbaord name="Dejan"></Leaderbaord>
            <Leaderbaord name="Josue"></Leaderbaord>
          </div>
          <div className="leaderboard">
            <p className="leaderboard-header">Most Activity</p>
            <Leaderbaord name="Ben"></Leaderbaord>
            <Leaderbaord name="Ayham"></Leaderbaord>
            <Leaderbaord name="Dejan"></Leaderbaord>
            <Leaderbaord name="Josue"></Leaderbaord>
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
