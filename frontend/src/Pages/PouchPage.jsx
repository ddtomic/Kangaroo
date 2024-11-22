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
  threadID: propTypes.number,
  name: propTypes.string,
  title: propTypes.string,
  timestamp: propTypes.string,
};

function PouchPage(props) {
  const { authState } = useContext(AuthContext);
  const [threadReplies, setThreadReplies] = useState([]);
  const [threadScore, setThreadScore] = useState(0);

  const initialValues = {
    replyfield: "",
  };

  const validationSchema = Yup.object().shape({
    replyfield: Yup.string()
      .min(1, "Comment needs at least 1 character!")
      .required("Comment content is required!"),
  });

  const getRatings = async () => {
    axios
      .get(`http://18.119.120.175:3002/rate/threadrates/${props.threadID}`)
      .then((response) => {
        return setThreadScore(response.data.score);
      })
      .catch((error) => {
        return console.log("Could not get thread score:", error);
      });
  };

  /*const ratingRefresh = async () => {
    getRatings();
  };*/

  const getComments = async () => {
    axios
      .get(`http://18.119.120.175:3002/comment/comms/${props.threadID}`)
      .then((response) => {
        setThreadReplies(response.data);
      })
      .catch((error) => {
        console.log("Could not get comments:", error);
      });
  };

  const commentRefresh = async () => {
    getComments();
  };

  const onSubmit = (data, { resetForm }) => {
    axios
      .post(
        "http://18.119.120.175:3002/comment/",
        (data = {
          threadID: props.threadID,
          comment: data.replyfield,
          userID: authState.id,
        })
      )
      .then((response) => {
        console.log(response.data);
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
        comment={props.comment}
        title={props.title}
        timestamp={formatDate(props.timestamp)}
        replycount={threadReplies.length}
        likecount={threadScore}
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
