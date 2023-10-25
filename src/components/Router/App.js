import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/home";
import Login from "../../pages/Login/login";
import Profile from "../../pages/Profile/profile";
import Error from '../../pages/Error/errorPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
