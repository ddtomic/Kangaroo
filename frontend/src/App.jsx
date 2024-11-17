import React, { useEffect, useState } from "react";
import AuthPage from "./Pages/AuthPage";
import MainPage from "./Pages/MainPage";
import { Routes, Route } from "react-router-dom";
import PouchPage from "./Pages/PouchPage";
import SignUp from "./Pages/SignUp";
import ProfilePage from "./Pages/ProfilePage";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";

const App = () => {
  const [threadList, setThreadList] = useState([]);
  const [authState, setAuthState] = useState({
    username: "",
    id: "",
    status: false,
  });

  const urlSetup = (title) => {
    return title.substring(0, title.size || 10);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the incoming date string
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  useEffect(() => {
    axios
      .get("http://18.119.120.175:3002/thread/date")
      .then((response) => {
        setThreadList(response.data);
      })
      .catch((error) => console.log("error getting threads:", error));

    axios
      .get("http://18.119.120.175:3002/auth/", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Routes>
        <Route path="/home" element={<MainPage />} />
        {threadList.map((value, key) => {
          return (
            <Route
              key={key}
              path={urlSetup(value.title)}
              element={
                <PouchPage
                  name={value.userThread.username}
                  comment={value.content}
                  title={value.title}
                  timestamp={formatDate(value.createdAt)}
                  replycount={value.commentCount}
                  likecount={value.threadRatings.length}
                />
              }
            />
          );
        })}
        ;
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<AuthPage />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
