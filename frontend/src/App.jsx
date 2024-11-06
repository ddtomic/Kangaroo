import React from "react";
import AuthPage from "./Pages/AuthPage";
import MainPage from "./Pages/MainPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
