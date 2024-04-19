import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import CreateANewPost from "./components/CreateANewPost";
import DetailedPost from "./components/DetailedPost";
import { DETAILS_ROUTE, CREATE_ROUTE, HOME_ROUTE } from "./constants/routes";
import { Navigate, Route, Routes } from "react-router-dom";
import newBodyContext from "./context/newBodyContext";
import idContextOfDeletingPost from "./context/deletingPostContext";
import { useState } from "react";

function App() {
  const [newBody, setNewBody] = useState("");
  const [idOfNewBody, setIdOfNewBody] = useState("");
  const [idOfDeleteingPost, setIdOfDeleteingPost] = useState("");

  return (
    <newBodyContext.Provider
      value={{
        newBody: newBody,
        setNewBody: setNewBody,
        idOfNewBody: idOfNewBody,
        setIdOfNewBody: setIdOfNewBody,
      }}
    >
      <idContextOfDeletingPost.Provider
        value={{
          idOfDeleteingPost: idOfDeleteingPost,
          setIdOfDeleteingPost: setIdOfDeleteingPost,
        }}
      >
        <div className="App">
          <NavBar />
          <Routes>
            <Route path={HOME_ROUTE} element={<HomePage />} />
            <Route path={CREATE_ROUTE} element={<CreateANewPost />} />
            <Route path={DETAILS_ROUTE} element={<DetailedPost />} />
            <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
          </Routes>
        </div>
      </idContextOfDeletingPost.Provider>
    </newBodyContext.Provider>
  );
}

export default App;
