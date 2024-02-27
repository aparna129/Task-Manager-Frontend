import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./Pages/Register/RegisterPage";
import LoginPage from "./Pages/Login/LoginPage";
import Board from "./Pages/Board/Board";
import Analytics from "./Pages/Analytics/Analytics";
import Settings from "./Pages/Settings/Settings";
import PublicPage from "./Pages/PublicPage/PublicPage";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const baseUrl = "http://localhost:4000/";

  localStorage.setItem("baseUrl", baseUrl);

  return (
    <div>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/analytics" element={<Analytics />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/task/:taskId" element={<PublicPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
