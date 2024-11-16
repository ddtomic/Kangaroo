import React, { useEffect, useState } from "react";
import AuthPage from "./Pages/AuthPage";
import MainPage from "./Pages/MainPage";
import { Routes, Route } from "react-router-dom";
import PouchPage from "./Pages/PouchPage";
import SignUp from "./Pages/SignUp";
import CreatePage from "./Pages/CreatePage";
import ProfilePage from "./Pages/ProfilePage";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";

const App = () => {
  const [authState, setAuthState] = useState({
    username: "",
    id: "",
    status: false,
  });

  useEffect(() => {
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
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Routes>
        <Route path="/home" element={<MainPage />} />
        <Route path="/pouch" element={<PouchPage />} />
        <Route path="/pouch" element={<PouchPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<AuthPage />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
