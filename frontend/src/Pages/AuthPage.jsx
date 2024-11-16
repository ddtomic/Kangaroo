import axios from "axios";
import React, { useState } from "react";
import "./AuthPage.css";
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

  const onSubmitSignUp = (data) => {
    axios
      .post("http://18.119.120.175:3002/auth/", data)
      .then(() => {
        console.log("User created successfully");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });

    navTo("/");
  };

  const onSubmitSignIn = (data) => {
    const userData = { username: data.username, password: data.password };
    axios
      .post("http://18.119.120.175:3002/auth/signin", userData)
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
            <Field
              className="inpField"
              id="userInputArea"
              autoComplete="off"
              name="email"
              placeholder="Email..."
            />
            <Field
              autoComplete="off"
              name="username"
              placeholder="Username..."
            />
            <Field
              autoComplete="off"
              name="password"
              placeholder="Password..."
              type="password"
            />

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
            <Field
              autoComplete="off"
              name="username"
              placeholder="Username..."
            />
            <Field
              autoComplete="off"
              name="password"
              placeholder="Password..."
              type="password"
            />
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
