import React from "react";
import AuthPage from "./Pages/AuthPage";
import MainPage from "./Pages/MainPage";
import { Routes, Route } from "react-router-dom";
import PouchPage from "./Pages/PouchPage";
import CreatePage from "./Pages/CreatePage";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<MainPage />} />
      <Route path="/pouch" element={<PouchPage/>}/>
      <Route path="/create" element={<CreatePage/>}/>
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
