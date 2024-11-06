import axios from "axios";
import React from "react";
import "./MainPage.css";
import design from "../assets/images/pngegg.png";
import search from "../assets/images/icons8-search-50.png";
import like from "../assets/images/icons8-like-64.png";
import Navbar from "../Components/Navbar";

class MainPage extends React.Component {
  state = { details: [] };

  componentDidMount() {
    let data;
    axios
      .get("http://localhost:8000/")
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onSubmit = (data) => {
    console.log(data.target.username.value);
    axios.post("http://localhost:8000/", {
      username: data.target.username.value,
      email: data.target.email.value,
    });
  };

  render() {
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
            <button className="create-roo">Create Roo</button>
          </div>
          <div className="container">
            <li className="row">
              <a href="#">
                <h5 className="username">Quadspy</h5>
                <h2 className="title">
                  Got into a chicken fight in the bathroom
                </h2>
                <div className="bottom">
                  <p className="timestamp">11/5/2024</p>
                  <div className="feedback">
                    <img src={like} alt="like-img"></img>
                    <p className="comment-count">3 comments</p>
                  </div>
                </div>
              </a>
            </li>
            <li className="row">
              <a href="#">
                <h5 className="username">Dejan</h5>
                <h2 className="title">Oiled up my teacher</h2>
                <div className="bottom">
                  <p className="timestamp">11/5/2024</p>
                  <div className="feedback">
                    <img src={like} alt="like-img"></img>
                    <p className="comment-count">7 comments</p>
                  </div>
                </div>
              </a>
            </li>
            <li className="row">
              <a href="#">
                <h5 className="username">Josue</h5>
                <h2 className="title">Got locked in a room with Diddy</h2>
                <div className="bottom">
                  <p className="timestamp">11/5/2024</p>
                  <div className="feedback">
                    <img src={like} alt="like-img"></img>
                    <p className="comment-count">3 comments</p>
                  </div>
                </div>
              </a>
            </li>
            <li className="row">
              <a href="#">
                <h5 className="username">Ayham</h5>
                <h2 className="title">Crashed out in class so I blew it up</h2>
                <div className="bottom">
                  <p className="timestamp">11/5/2024</p>
                  <div className="feedback">
                    <img src={like} alt="like-img"></img>
                    <p className="comment-count">7 comments</p>
                  </div>
                </div>
              </a>
            </li>
            <li className="row">
              <a href="#">
                <h5 className="username">Drake</h5>
                <h2 className="title">
                  Had a diddy party in an elementry school
                </h2>
                <div className="bottom">
                  <p className="timestamp">11/5/2024</p>
                  <div className="feedback">
                    <img src={like} alt="like-img"></img>
                    <p className="comment-count">3 comments</p>
                  </div>
                </div>
              </a>
            </li>
            <li className="row">
              <a href="#">
                <h5 className="username">Togbe</h5>
                <h2 className="title">
                  Sacrificed my student for showing up late to class
                </h2>
                <div className="bottom">
                  <p className="timestamp">11/5/2024</p>
                  <div className="feedback">
                    <img src={like} alt="like-img"></img>
                    <p className="comment-count">7 comments</p>
                  </div>
                </div>
              </a>
            </li>
            <div className="switch-page">
              <button className="backBtn">Back Page</button>
              <button className="nextBtn">Next Page</button>
            </div>
          </div>
        </div>
        <div className="lower-body">
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
    );
  }
}

export default MainPage;
