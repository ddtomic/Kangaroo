import axios from "axios";
import React from "react";
import '../CSS/Pages/MainPage.css'
import Navbar from "../Components/Navbar";
import design from "../assets/images/pngegg.png";
import search from "../assets/images/icons8-search-50.png";
import ThreadBox from "../Props/ThreadBox";
import bell from "../assets/images/bell.png"
import { Link } from "react-router-dom";
import Leaderbaord from "../Props/Leaderboard";
import '../CSS/Pages/CreatePage.css'
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import * as Yup from "yup";
import Footer from "../Components/Footer";

const MainPage = () => {
  const [threadList, setThreadList] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the incoming date string
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const navTo = useNavigate();
  const { authState } = useContext(AuthContext);

  const initialValues = {
    threadTitle: "",
    threadContent: "",
  };

  const validationSchema = Yup.object().shape({
    threadTitle: Yup.string()
      .min(1, "Thread title is too short!")
      .max(99, "Thread title is too long!")
      .required("Thread title is required!"),
    threadContent: Yup.string()
      .min(10, "Threads need at least 10 characters!")
      //.max(1200, "Thread content too long!")
      .required("Thread content is required!"),
  });

  const postThread = (data, { resetForm }) => {
    axios
      .post(
        "http://18.119.120.175:3002/thread/create",
        (data = {
          threadTitle: data.threadTitle,
          threadContent: data.threadContent,
          userID: authState.id,
        })
      )
      .then(() => {
        console.log("Thread created successfully:", data);
        resetForm();
        window.location.reload();
      })
      .catch((error) => {
        console.log(data);
        console.error("Error creating thread:", error);
      });
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
        </div>
        <div className="roo-catagories">
          <a href="/">Most liked</a>
          <a href="/">Most Commented</a>
          <a href="/">Most Relavent</a>
        </div>
        <div className="middle-container">
          <div className="left-container">
            <Leaderbaord name="bem" count={3}></Leaderbaord>
          </div>

          <div className="container">
            {threadList.map((value, key) => {
              //console.log(value);
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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={postThread}
              >
                <Form>
                  <Field
                    className="title-input"
                    autoComplete="off"
                    name="threadTitle"
                    placeholder="Enter title here..."
                  />
                  <p>Thread Content</p>
                  <Field
                    className="desc-input"
                    as="textarea"
                    rows="5"
                    cols="30"
                    autoComplete="off"
                    name="threadContent"
                    placeholder="Be specific enough to intrigue but vague enough to invite curiosity."
                  />

                  <button type="submit" className="create-button">
                    Create
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MainPage;