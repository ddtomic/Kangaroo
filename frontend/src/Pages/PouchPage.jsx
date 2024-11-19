import React from "react";
import Navbar from "../Components/Navbar";
import "./PouchPage.css";
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
  comment: propTypes.string,
  title: propTypes.string,
  timestamp: propTypes.string,
  replycount: propTypes.number,
  likecount: propTypes.number,
  commentName: propTypes.string,
  commentContent: propTypes.string,
};

function PouchPage(props) {
  const { authState } = useContext(AuthContext);

  const initialValues = {
    replyfield: "",
  };

  const validationSchema = Yup.object().shape({
    replyfield: Yup.string()
      .min(1, "Comment needs at least 1 character!")
      .required("Comment content is required!"),
  });

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
      .then(() => {
        console.log("Comment posted successfully:", data);
        resetForm();
        window.location.reload();
      })
      .catch((error) => {
        console.log(data);
        console.error("Error posting comment:", error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the incoming date string
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
        replycount={props.replycount}
        likecount={props.likecount}
      />

      <div className="comment-box">
      {props.comments.map((value, key) => {
        return (
            <PouchReply
              name={value.userComment.username}
              comment={value.content}
              date={formatDate(value.createdAt)}

              key={key}
            />
        );
      })}
      </div>

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
      <Footer />
    </div>
  );
}

export default PouchPage;
