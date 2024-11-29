import axios from "axios";
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
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [threadList, setThreadList] = useState([]);
  const [activeLink, setActiveLink] = useState(1);
  const [leaderboard, setLeaderboard] = useState([]);

  const navTo = useNavigate();

  const handleLinkClick = (linkNumber) => {
    setActiveLink(linkNumber);
    threadRefresh(linkNumber);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the incoming date string
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const { authState } = useContext(AuthContext);

  const searchInitialValues = {
    searchBar: "",
  };

  const searchValidationSchema = Yup.object().shape({
    searchBar: Yup.string()
      .min(1, "Search needs at least 1 character!")
      .required("Search content is required!"),
  });

  const submitSearch = (query, { resetForm }) => {
    navTo(`/search/${query.searchBar}`);
    resetForm();
  };

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
        "https://kangaroo.click:3002/thread/create",
        (data = {
          threadTitle: data.threadTitle,
          threadContent: data.threadContent,
          userID: authState.id,
        })
      )
      .then((data) => {
        console.log("Thread created successfully:", data);
        resetForm();
        threadRefresh(activeLink);
      })
      .catch((error) => {
        console.log(data);
        console.error("Error creating thread:", error);
      });
  };

  const authUser = async () => {
    const state = await axios
      .get("https://kangaroo.click:3002/auth/", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .catch((error) => {
        console.log("error:", error);
      });
    if (state.data.error) {
      return "no user";
    } else {
      return state;
    }
  };

  const getLeaderBoard = async () => {
    await axios
      .get("https://kangaroo.click:3002/auth/leaderboard")
      .then((response) => {
        setLeaderboard(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getThreads = async (link) => {
    const userInfo = await authUser();
    if (userInfo === "no user") {
      try {
        const threadResponse = await axios.get(
          "https://kangaroo.click:3002/thread/date"
        );
        const threads = threadResponse.data;

        const threadsWithReplies = await Promise.all(
          threads.map(async (thread) => {
            try {
              const commentResponse = await axios.get(
                `https://kangaroo.click:3002/comment/comms/${thread.threadID}`
              );

              const ratingResponse = await axios.get(
                `https://kangaroo.click:3002/rate/threadrates/${thread.threadID}`
              );

              return {
                ...thread,
                replyCount: commentResponse.data.length,
                score: ratingResponse.data.score,
                rating: "g",
              };
            } catch (error) {
              console.error(
                `Could not get comment counts for threadID ${thread.threadID}:`,
                error
              );
            }
          })
        );

        if (link === 3) {
          const replycountSortList = [...threadsWithReplies].sort(
            (a, b) => b.replyCount - a.replyCount
          );
          console.log("reply count sorted:", replycountSortList);
          return setThreadList(replycountSortList);
        } else if (link === 2) {
          const ratingSortList = [...threadsWithReplies].sort(
            (a, b) => b.score - a.score
          );
          console.log("rating sorted:", ratingSortList);
          return setThreadList(ratingSortList);
        } else {
          //Sorted by date desc.
          console.log("date sorted:", threadsWithReplies);
          return setThreadList(threadsWithReplies);
        }
      } catch (error) {
        console.error("Failed to get threads:", error);
      }
    } else {
      try {
        const threadResponse = await axios.get(
          "https://kangaroo.click:3002/thread/date"
        );
        const threads = threadResponse.data;

        const threadsWithReplies = await Promise.all(
          threads.map(async (thread) => {
            try {
              const commentResponse = await axios.get(
                `https://kangaroo.click:3002/comment/comms/${thread.threadID}`
              );

              const ratingResponse = await axios.get(
                `https://kangaroo.click:3002/rate/threadrates/${thread.threadID}`
              );

              const rating = await axios
                .get(
                  `https://kangaroo.click:3002/auth/threadlikes/${userInfo.data.id}/${thread.threadID}`
                )
                .catch((error) => {
                  if (error.status === 404) {
                    return { data: "n" };
                  }
                });

              return {
                ...thread,
                replyCount: commentResponse.data.length,
                score: ratingResponse.data.score,
                rating: rating.data,
              };
            } catch (error) {
              console.error(
                `Could not get comment counts for threadID ${thread.threadID}:`,
                error
              );
            }
          })
        );

        if (link === 3) {
          const replycountSortList = [...threadsWithReplies].sort(
            (a, b) => b.replyCount - a.replyCount
          );
          console.log("reply count sorted:", replycountSortList);
          return setThreadList(replycountSortList);
        } else if (link === 2) {
          const ratingSortList = [...threadsWithReplies].sort(
            (a, b) => b.score - a.score
          );
          console.log("rating sorted:", ratingSortList);
          return setThreadList(ratingSortList);
        } else {
          //Sorted by date desc.
          console.log("date sorted:", threadsWithReplies);
          return setThreadList(threadsWithReplies);
        }
      } catch (error) {
        console.error("Failed to get threads:", error);
      }
    }
  };

  const threadRefresh = (link) => {
    console.log("refreshing threads");
    getThreads(link);
  };

  useEffect(() => {
    authUser();
    getThreads(1);
    getLeaderBoard();
  }, []);

  return (
    <div className="main">
      <Navbar />
      <div className="upper-body">
        <img src={design} alt="background-image"></img>
        <p>Welcome to Kangaroo!</p>
        <div className="upper-search">
          <img src={search} alt="search-img"></img>
          <Formik
            initialValues={searchInitialValues}
            validationSchema={searchValidationSchema}
            onSubmit={submitSearch}
          >
            <Form>
              <Field
                autoComplete="off"
                type="text"
                placeholder="Search Roo..."
                name="searchBar"
              />
            </Form>
          </Formik>
        </div>
      </div>

      <div className="middle-body">
        <p className="middle-p">
          Collaborate with a community of creators who are building the future
          of online conversations
        </p>
        <div className="roo-header">
          <p>Pouches</p>
        </div>
        <div className="roo-catagories">
          <a
            onClick={() => handleLinkClick(1)}
            className={`link ${activeLink === 1 ? "active" : ""}`}
          >
            Most Recent
          </a>
          <a
            onClick={() => handleLinkClick(2)}
            className={`link ${activeLink === 2 ? "active" : ""}`}
          >
            Most Liked
          </a>
          <a
            onClick={() => handleLinkClick(3)}
            className={`link ${activeLink === 3 ? "active" : ""}`}
          >
            Most Commented
          </a>
        </div>
        <div className="middle-container">
          <div className="left-container">
            <div className="leaderboard-header">
              <p>Leaderboard</p>
            </div>
            {leaderboard.map((value, key) => {
              return (
                <Leaderbaord
                  key={key}
                  userID={value.userID}
                  name={value.username}
                  count={value.score}
                  pfp={value.pfp}
                ></Leaderbaord>
              );
            })}
          </div>

          <div className="container">
            {threadList.map((value, key) => {
              return (
                <ThreadBox
                  key={key}
                  main={true}
                  threadID={value.threadID}
                  name={value.userThread.username}
                  title={value.title}
                  timestamp={formatDate(value.createdAt)}
                  replyCount={value.replyCount}
                  score={value.score}
                  isLiked={value.rating}
                  pfp={value.userThread.pfp}
                  refreshThread={() => threadRefresh(activeLink)}
                ></ThreadBox>
              );
            })}
          </div>
          {authState.status ? (
            //SIGNED IN
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
                    <ErrorMessage
                      name="threadTitle"
                      className="error"
                      component="span"
                    />
                    <Field
                      className="title-input"
                      autoComplete="off"
                      name="threadTitle"
                      placeholder="Enter title here..."
                    />

                    <p>Thread Content</p>
                    <ErrorMessage
                      name="threadContent"
                      className="error"
                      component="span"
                    />
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
          ) : (
            //NOT SIGNED IN
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
                    <ErrorMessage
                      name="threadTitle"
                      className="error"
                      component="span"
                    />
                    <Field
                      disabled={true}
                      className="title-input"
                      autoComplete="off"
                      name="threadTitle"
                      placeholder="Login or sign up to join the conversation!"
                    />

                    <p>Thread Content</p>
                    <ErrorMessage
                      name="threadContent"
                      className="error"
                      component="span"
                    />
                    <Field
                      disabled={true}
                      className="desc-input"
                      as="textarea"
                      rows="5"
                      cols="30"
                      autoComplete="off"
                      name="threadContent"
                      placeholder="Login or sign up to join the conversation!"
                    />

                    <button
                      disabled={true}
                      type="submit"
                      className="create-button"
                    >
                      Create
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
