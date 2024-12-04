import axios from "axios";
import React, { useState } from "react";
import "../CSS/Pages/AuthPage.css";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

const AuthPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const navTo = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const initialValuesSignUp = {
    email: "",
    username: "",
    password: "",
  };

  const initialValuesSignIn = {
    username: "",
    password: "",
  };

  const validationSchemaSignUp = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email!")
      .required("Email is required!"),
    username: Yup.string()
      .min(1, "Username must be at least 1 character!")
      .max(29, "Username too long!")
      .required("Username is required!"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters!")
      .max(29, "Password is too long!")
      .required("Password is required!"),
  });

  const validationSchemaSignIn = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required!"),
  });

  const [isActive, setIsActive] = useState(false);

  const setActive = () => {
    setIsActive(true);
  };

  const resetActive = () => {
    setIsActive(false);
  };

  const onSubmitSignUp = (data, { resetForm }) => {
    axios
      .post("http://localhost:3002/auth/", data)
      .then(() => {
        console.log("User created successfully");
        setIsActive(false);
        resetForm();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  const onSubmitSignIn = (data, { resetForm }) => {
    const userData = { username: data.username, password: data.password };
    axios
      .post("http://localhost:3002/auth/signin", userData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          console.log("User signed in successfully");
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
          navTo("/home");
          resetForm();
        }
      });
  };

  return (
    <div
      className={`auth-container${isActive ? " active" : ""}`}
      id="auth-container"
    >
      <div className="form-container sign-up">
        <Formik
          initialValues={initialValuesSignUp}
          onSubmit={onSubmitSignUp}
          validationSchema={validationSchemaSignUp}
        >
          <Form>
            <h1>Create Account</h1>

            <div className="authpage-error">
              <ErrorMessage
                name="email"
                className="email-error"
                component="span"
              />
              <Field autoComplete="off" name="email" placeholder="Email..." />
            </div>

            <div className="authpage-error">
              <ErrorMessage
                name="username"
                className="username-error"
                component="span"
              />
              <Field
                autoComplete="off"
                name="username"
                placeholder="Username..."
              />
            </div>

            <div className="authpage-error">
              <ErrorMessage
                name="password"
                className="password-error"
                component="span"
              />
              <Field
                autoComplete="off"
                name="password"
                placeholder="Password..."
                type="password"
              />
            </div>

            <button type="submit">Sign Up</button>
          </Form>
        </Formik>
      </div>

      <div className="form-container sign-in">
        <Formik
          initialValues={initialValuesSignIn}
          onSubmit={onSubmitSignIn}
          validationSchema={validationSchemaSignIn}
        >
          <Form>
            <h1>Sign In</h1>

            <div className="authpage-error">
              <ErrorMessage
                name="username"
                className="username-error"
                component="span"
              />
              <Field
                autoComplete="off"
                name="username"
                placeholder="Username..."
              />
            </div>

            <div className="authpage-error">
              <ErrorMessage
                name="password"
                className="password-error"
                component="span"
              />
              <Field
                autoComplete="off"
                name="password"
                placeholder="Password..."
                type="password"
              />
            </div>

            <button type="submit">Sign In</button>
          </Form>
        </Formik>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome to Kangaroo!</h1>
            <p>Already have an account? Click the button to sign in!</p>
            <button className="hidden" id="login" onClick={resetActive}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>
              Dont have an account? Register with your information to create
              one!
            </p>
            <button className="hidden" id="register" onClick={setActive}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
