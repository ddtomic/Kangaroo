import axios, { all } from "axios";
import React from "react";
import "../CSS/Pages/MainPage.css";
import Navbar from "../Components/Navbar";
import design from "../assets/images/pngegg.png";
import search from "../assets/images/icons8-search-50.png";
import ThreadBox from "../Props/ThreadBox";
import Leaderbaord from "../Props/Leaderboard";
import "../CSS/Pages/CreatePage.css";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import * as Yup from "yup";
import Footer from "../Components/Footer";
const MainPage = () => {
  const [threadList, setThreadList] = useState([]);
  const [ activeLink, setActiveLink ] = useState(1); 

  const handleLinkClick = (linkNumber) => {
    setActiveLink(linkNumber); 
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the incoming date string
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

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
      .min(1, "Threads need at least 1 character!")
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
      .then((data) => {
        console.log("Thread created successfully:", data);
        resetForm();
        threadRefresh();
      })
      .catch((error) => {
        console.log(data);
        console.error("Error creating thread:", error);
      });
  };

  const getThreads = async () => {
    try {
      console.log("Fetching threads...");

      const threadResponse = await axios.get(
        "http://18.119.120.175:3002/thread/date"
      );
      const threads = threadResponse.data;

      const threadsWithReplies = await Promise.all(
        threads.map(async (thread) => {
          try {
            const commentResponse = await axios.get(
              `http://18.119.120.175:3002/comment/comms/${thread.threadID}`
            );
            return {
              ...thread,
              replyCount: commentResponse.data.length,
            };
          } catch (error) {
            console.error(
              `Could not get comment counts for threadID ${thread.threadID}:`,
              error
            );
            return { ...thread, replyCount: 0 };
          }
        })
      );

      // Update the state with the final array
      setThreadList(threadsWithReplies);
    } catch (error) {
      console.error("Failed to get threads:", error);
    }
  };

  const threadRefresh = () => {
    getThreads();
  };

  useEffect(() => {
    getThreads();
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
          <a onClick={()=>handleLinkClick(1)} className={`link ${activeLink === 1 ? 'active' : ''}`} >Most Recent</a>
          <a onClick={()=>handleLinkClick(2)} className={`link ${activeLink === 2 ? 'active' : ''}`}>Most Liked</a>
          <a onClick={()=>handleLinkClick(3)} className={`link ${activeLink === 3 ? 'active' : ''}`}>Most Commented</a>
        </div>
        <div className="middle-container">
          <div className="left-container">
            <Leaderbaord name="bem" count={3}></Leaderbaord>
          </div>

          <div className="container">
            {threadList.map((value, key) => {
              return (
                <ThreadBox
                  key={key}
                  threadID={value.threadID}
                  name={value.userThread.username}
                  title={value.title}
                  timestamp={formatDate(value.createdAt)}
                  replyCount={value.replyCount}
                ></ThreadBox>
              );
            })}
          </div>

          <div className="right-container">
            <div className="create-container">
              <h2>New Conversation</h2>
              <h4>Ask a question, start a discussion or start an idea.</h4>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={postThread}
              >
                <Form>
                <div className="title-error">
                    <p>Title</p>
                    <ErrorMessage
                      name="threadTitle"
                      className="error"
                      component="span"
                    />
                </div>

                  <Field
                    className="title-input"
                    autoComplete="off"
                    name="threadTitle"
                    placeholder="Enter title here..."
                  />

                  <div className="message-error">
                    <p>Thread Content</p>
                    <ErrorMessage
                      name="threadContent"
                      className="error"
                      component="span"
                    />
                    </div>
                    
                  <Field
                    className="desc-input"
                    as="textarea"
                    rows="5"
                    cols="30"
                    autoComplete="off"
                    name="threadContent"
                    placeholder="Be specific enough to intrigue but vague enough to invite curiosity."
                  />

                  <button
                    disabled={!authState.status}
                    type="submit"
                    className="create-button"
                  >
                    Create
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
