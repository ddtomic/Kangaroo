import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignUp = () => {
  const navTo = useNavigate();

  const initialValues = {
    email: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email!")
      .required("Email is required!"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters!")
      .max(15, "Username too long!")
      .required("Username is required!"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters!")
      .required("Password is required!"),
  });

  const onSubmit = (data) => {
    axios.post("http://18.119.120.175:3306/auth", data).then(() => {
      console.log("User created successfully");
      navTo("/signin");
    });
  };

  return (
    <div className="log-border-2">
      <div className="log-container">
        <h1 className="signin">Sign Up</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="inpIns">
              <label className="user_in">
                <b>Email</b>
              </label>
              <ErrorMessage className="error" name="email" component="span" />
            </div>
            <Field
              className="inpField"
              autoComplete="off"
              id="userInputArea"
              name="email"
              placeholder="Enter Email"
            />
            <div className="inpIns">
              <label className="user_in">
                <b>Username</b>
              </label>
              <ErrorMessage
                name="username"
                className="error"
                component="span"
              />
            </div>
            <Field
              className="inpField"
              autoComplete="off"
              name="username"
              placeholder="Enter Username"
            />
            <div className="inpIns">
              <label className="user_in">
                <b>Password</b>
              </label>
              <ErrorMessage
                name="password"
                className="error"
                component="span"
              />
            </div>
            <Field
              className="inpField"
              autoComplete="off"
              name="password"
              placeholder="Enter Password"
              type="password"
            />
            <btn type="submit" className="botton">
              Sign Up
            </btn>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
