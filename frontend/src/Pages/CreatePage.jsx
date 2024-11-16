import React from "react";
import Navbar from "../Components/Navbar";
import "./CreatePage.css";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

const CreatePage = () => {
  const navTo = useNavigate();
  const { authState } = useContext(AuthContext);

  const initialValues = {
    threadTitle: "",
    threadContent: "",
    userID: authState.userID,
  };

  const validationSchema = Yup.object().shape({
    threadTitle: Yup.string()
      .min(1, "Thread title is too short!")
      .max(99, "Thread title is too long!")
      .required("Thread title is required!"),
    threadContent: Yup.string()
      .min(10, "Threads need at least 10 characters!")
      .max(1200, "Thread content too long!")
      .required("Thread content is required!"),
  });

  const onSubmit = (data) => {
    axios
      .post("http://18.119.120.175:3002/thread/create", data)
      .then(() => {
        console.log("Thread created successfully");
      })
      .catch((error) => {
        console.log(authState);
        console.log(data);
        console.error("Error creating thread:", error);
      });
  };
  return (
    <div className="create-background">
      <Navbar />
      <div className="create-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <h2>New Conversation</h2>
            <h4>Ask a question, start a discussion, or explain an idea.</h4>
            <p>Thread Title</p>
            <Field
              className="title-input"
              autoComplete="off"
              name="threadTitle"
              placeholder="Be specific enough to intrigue but vague enough to invite curiosity."
            />
            <p>Thread Content</p>
            <Field
              className="desc-input"
              autoComplete="off"
              name="threadContent"
              placeholder="Be brief, be clear, and leave room for cheer."
            />

            <button type="submit" className="create-button">
              Create
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreatePage;
