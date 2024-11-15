import React from "react";
import AuthPage from "./Pages/AuthPage";
import MainPage from "./Pages/MainPage";
import { Routes, Route } from "react-router-dom";
import PouchPage from "./Pages/PouchPage";
import SignUp from "./Pages/SignUp";
import CreatePage from "./Pages/CreatePage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="/pouch" element={<PouchPage />} />
      <Route path="/pouch" element={<PouchPage/>}/>
      <Route path="/create" element={<CreatePage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="*" element={<AuthPage />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
