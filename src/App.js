import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage1";
import CreateANewPost from "./components/CreateANewPost";
import DetailedPost from "./components/DetailedPost";
import { DETAILS_ROUTE, CREATE_ROUTE, HOME_ROUTE } from "./constants/constant";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={HOME_ROUTE} element={<HomePage />} />
        <Route path={CREATE_ROUTE} element={<CreateANewPost />} />
        <Route path={DETAILS_ROUTE} element={<DetailedPost />} />
        <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
      </Routes>
    </div>
  );
}

export default App;
