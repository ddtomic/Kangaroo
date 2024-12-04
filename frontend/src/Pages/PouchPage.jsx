import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../CSS/Pages/PouchPage.css";
import PouchReply from "../Props/PouchReply";
import Pouch from "../Props/Pouch";
import propTypes from "prop-types";
import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import * as Yup from "yup";
import Footer from "../Components/Footer";
import axios from "axios";

PouchPage.propTypes = {
  keyer: propTypes.number,
  userID: propTypes.number,
  threadID: propTypes.number,
  name: propTypes.string,
  title: propTypes.string,
  timestamp: propTypes.string,
  pfp: propTypes.number,
};

function PouchPage(props) {
  const { authState } = useContext(AuthContext);
  const [threadReplies, setThreadReplies] = useState([]);
  const [threadInfo, setThreadInfo] = useState({});

  const initialValues = {
    replyfield: "",
  };

  const validationSchema = Yup.object().shape({
    replyfield: Yup.string()
      .min(1, "Comment needs at least 1 character!")
      .required("Comment content is required!"),
  });

  const authUser = async () => {
    const state = await axios
      .get("https://kangarooo.click:3002/auth/", {
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

  const getRatings = async () => {
    const userInfo = await authUser();
    if (userInfo === "no user") {
      console.log("Not signed in error!");
      try {
        const score = await axios
          .get(
            `https://kangarooo.click:3002/rate/threadrates/${props.threadID}`
          )
          .catch((error) => {
            return console.log("Could not get thread score:", error);
          });
        setThreadInfo({
          score: score.data.score,
          rating: "g",
        });
        return;
      } catch (error) {
        console.log("error:", error);
      }
      return;
    }
    try {
      const score = await axios
        .get(`https://kangarooo.click:3002/rate/threadrates/${props.threadID}`)
        .catch((error) => {
          return console.log("Could not get thread score:", error);
        });

      const rating = await axios
        .get(
          `https://kangarooo.click:3002/auth/threadlikes/${userInfo.data.id}/${props.threadID}`
        )
        .catch((error) => {
          if (error.status === 404) {
            return { data: "n" };
          }
        });
      setThreadInfo({
        score: score.data.score,
        rating: rating.data,
      });
      return;
    } catch (error) {
      console.log("error:", error);
    }
  };

  const ratingRefresh = () => {
    getRatings();
  };

  const getComments = async () => {
    const userInfo = await authUser();
    if (userInfo === "no user") {
      console.log("Not signed in error!");
      try {
        const commsResponse = await axios
          .get(`https://kangarooo.click:3002/comment/comms/${props.threadID}`)
          .catch((error) => {
            console.log("Could not get comments:", error);
          });
        const comments = commsResponse.data;

        const ratings = [];

        const finalComments = comments.map((comment) => {
          const isRating = ratings.find(
            (rating) => rating.commentID === comment.commentID
          );
          return {
            ...comment,
            isLiked: "g",
          };
        });
        return setThreadReplies(finalComments);
      } catch (error) {
        console.log("error:", error);
      }
    }
    try {
      const commsResponse = await axios
        .get(`https://kangarooo.click:3002/comment/comms/${props.threadID}`)
        .catch((error) => {
          console.log("Could not get comments:", error);
        });
      const comments = commsResponse.data;

      const ratingResponse = await axios
        .get(
          `https://kangarooo.click:3002/auth/commentlikes/${userInfo.data.id}/${props.threadID}`
        )
        .catch((error) => {
          if (error.status === 404) {
            return { data: [] };
          }
          console.log(error);
        });
      const ratings = ratingResponse.data;

      const finalComments = comments.map((comment) => {
        const isRating = ratings.find(
          (rating) => rating.commentID === comment.commentID
        );
        return {
          ...comment,
          isLiked: isRating ? isRating.rating : "n",
        };
      });
      return setThreadReplies(finalComments);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const commentRefresh = async () => {
    getComments();
  };

  const onSubmit = (data, { resetForm }) => {
    axios
      .post(
        "https://kangarooo.click:3002/comment/",
        (data = {
          threadID: props.threadID,
          comment: data.replyfield,
          userID: authState.id,
        })
      )
      .then((response) => {
        resetForm();
        commentRefresh();
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  useEffect(() => {
    getComments();
    getRatings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div className="pouch-background">
      <Navbar />
      <Pouch
        name={props.name}
        userID={props.userID}
        threadID={props.threadID}
        comment={props.comment}
        title={props.title}
        timestamp={formatDate(props.timestamp)}
        replycount={threadReplies.length}
        likecount={threadInfo.score}
        isLiked={threadInfo.rating}
        pfp={props.pfp}
        refreshRating={() => ratingRefresh()}
      />

      {authState.status ? (
        <div className="reply-container">
          <h2>Reply</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Field
                className="pouch-input"
                as="textarea"
                rows="5"
                cols="30"
                autoComplete="off"
                name="replyfield"
                placeholder="Add to the conversation!"
              />
              <button className="pouch-button" type="submit">
                Send
              </button>
            </Form>
          </Formik>
        </div>
      ) : (
        <div className="reply-container">
          <h2>Reply</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Field
                className="pouch-input"
                disabled={true}
                as="textarea"
                rows="5"
                cols="30"
                autoComplete="off"
                name="replyfield"
                placeholder="Login or sign up to join the conversation!"
              />
              <button disabled={true} className="pouch-button" type="submit">
                Send
              </button>
            </Form>
          </Formik>
        </div>
      )}

      <div className="comment-box">
        {threadReplies.map((value, key) => {
          return (
            <PouchReply
              name={value.userComment.username}
              comment={value.content}
              date={formatDate(value.createdAt)}
              commentID={value.commentID}
              rating={value.isLiked}
              refreshComments={() => commentRefresh()}
              pfp={value.userComment.pfp}
              userID={value.userID}
              key={key}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default PouchPage;
