import React, { useEffect, useState } from "react";
import AuthPage from "./Pages/AuthPage";
import MainPage from "./Pages/MainPage";
import { Routes, Route } from "react-router-dom";
import PouchPage from "./Pages/PouchPage";
import ProfilePage from "./Pages/ProfilePage";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import SearchPage from "./Pages/SearchPage";

const App = () => {
  const [threadList, setThreadList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [authState, setAuthState] = useState({
    username: "",
    id: "",
    status: false,
  });

  const urlSetup = (currThread) => {
    let final =
      currThread.threadID.toString() +
      "/" +
      currThread.title.replace(/\s+/g, "_");
    return final;
  };

  const getThreads = async () => {
    axios
      .get("https://kangarooo.click:3002/thread/date")
      .then((response) => {
        setThreadList(response.data);
      })
      .catch((error) => console.log("Error getting threads:", error));
  };

  const authUser = async () => {
    axios
      .get("https://kangarooo.click:3002/auth/", {
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
  };

  const getUserProfiles = async () => {
    await axios
      .get("https://kangarooo.click:3002/auth/users")
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const refreshUserProfile = () => {
    getUserProfiles();
  };

  useEffect(() => {
    authUser();
    getUserProfiles();
    getThreads();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Routes>
        <Route path="/search/:query" element={<SearchPage />} />
        <Route
          path="*"
          element={<MainPage refreshThread={() => getThreads()} />}
        />
        {threadList.map((value, key) => {
          return (
            <Route
              key={key}
              path={urlSetup(value)}
              element={
                <PouchPage
                  refreshThread={() => getThreads()}
                  threadID={value.threadID}
                  name={value.userThread.username}
                  userID={value.userID}
                  comment={value.content}
                  title={value.title}
                  timestamp={value.createdAt}
                  pfp={value.userThread.pfp}
                  key={key}
                />
              }
            />
          );
        })}
        ;
        {userList.map((value, key) => {
          return (
            <Route
              key={key}
              path={`/${value.userID}/${value.username}`}
              element={
                <ProfilePage
                  profileRefresh={() => refreshUserProfile()}
                  name={value.username}
                  register_year={value.createdAt.substring(0, 4)}
                  likes={value.userThreadScore + value.userCommentScore}
                  bio={value.bio}
                  pfp={value.pfp}
                  userID={value.userID}
                />
              }
            />
          );
        })}
        ;
        <Route
          path="/signup"
          element={<AuthPage refreshProfiles={() => getUserProfiles()} />}
        />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
