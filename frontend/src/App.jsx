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

  function ratingAmount(rates) {
    // console.log(rates);
    let like = 0;
    let dlike = 0;
    rates.map((rating) => {
      if (rating.rating === "l") {
        like++;
      } else {
        dlike++;
      }
      const total = like - dlike;
      console.log("total:", total);
      return total;
    });
  }

  useEffect(() => {
    axios
      .get("http://18.119.120.175:3002/thread/date")
      .then((response) => {
        setThreadList(response.data);
      })
      .catch((error) => console.log("Error getting threads:", error));

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
          console.log(ratingAmount(value.threadRatings));
          return (
            <Route
              key={key}
              path={urlSetup(value.title)}
              element={
                <PouchPage
                  threadID={value.threadID}
                  name={value.userThread.username}
                  comment={value.content}
                  title={value.title}
                  timestamp={value.createdAt}
                  replycount={value.comments.length}
                  likecount={ratingAmount(value.threadRatings)}
                  comments={value.comments}
                  key={key}
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
