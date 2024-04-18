import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage1";
import CreateANewPost from "./components/CreateANewPost";
import DetailedPost from "./components/DetailedPost";
import { DETAILS_ROUTE, CREATE_ROUTE, HOME_ROUTE } from "./constants/routes";
import { Navigate, Route, Routes } from "react-router-dom";
import newBodyContext from "./context/newBodyContext";
import { useState } from "react";

function App() {
  const [newBody, setNewBody] = useState("");
  const [idOfNewBody, setIdOfNewBody] = useState("");
  console.log(newBody + " newBody");
  console.log(idOfNewBody + " idOfNewBody");
  console.log(setIdOfNewBody + " setIdOfNewBody");
  console.log(setNewBody + " setNewBody");

  return (
    <newBodyContext.Provider
      value={{
        newBody: newBody,
        setNewBody: setNewBody,
        idOfNewBody: idOfNewBody,
        setIdOfNewBody: setIdOfNewBody,
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
    </newBodyContext.Provider>
  );
}

export default App;
