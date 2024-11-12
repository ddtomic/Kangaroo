import axios from "axios";
import React from "react";
import './MainPage.css';
import Navbar from "../Components/Navbar";
import design from '../assets/images/pngegg.png'
import search from '../assets/images/icons8-search-50.png'
import ThreadBox from "../Components/ThreadBox";


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
        <Navbar/>
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
        <div className="roo-catagories">
          <a href='/'>Most liked</a>
          <a href='/'>Most Commented</a>
          <a href='/'>Most Relavent</a>
        </div>
        <div className="container">

            <ThreadBox name='Quadspy' title='Hello world' timestamp='11/2/3023' commentcount='45' ratingcount='24'></ThreadBox>
            <ThreadBox name='Quadspy' title='Hello world' timestamp='11/2/3023' commentcount='45' ratingcount='24'></ThreadBox>
            <ThreadBox name='Quadspy' title='Ran into a bera in the woods and fought it off with a stic! Also I was' timestamp='11/2/3023' commentcount='45' ratingcount='24'></ThreadBox>
            <ThreadBox name='Quadspy' title='Hello world' timestamp='11/2/3023' commentcount='45' ratingcount='24'></ThreadBox>
            <ThreadBox name='Quadspy' title='Hello world' timestamp='11/2/3023' commentcount='45' ratingcount='24'></ThreadBox>
            
            
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
        </footer>
      </div>
    );
  }
}

export default MainPage;
