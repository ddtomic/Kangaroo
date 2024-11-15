import React from "react";
import AuthPage from "./Pages/AuthPage";
import MainPage from "./Pages/MainPage";
import { Routes, Route } from "react-router-dom";
import PouchPage from "./Pages/PouchPage";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="/pouch" element={<PouchPage />} />
      <Route path="*" element={<AuthPage />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
