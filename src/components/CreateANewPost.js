import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../constants/routes";
import ModalCancelConfirm from "././Modals/ModalCancelConfirm";
import ModalDoneConfirm from "././Modals/ModalDoneConfirm";
import postsContext from "../context/postsContext";
import { v4 as uuidv4 } from "uuid";

export default function CreateANewPost() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createdPosts, setCreatedPosts] = useState([]);
  const [initial, setInitial] = useState(true);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showDoneConfirmation, setShowDoneConfirmation] = useState(false);
  const { posts } = useContext(postsContext);
  const { setPosts } = useContext(postsContext);

  const navigate = useNavigate();

  /*-------------------------------------------pressing Cancel-----------------*/

  function onCancelClick() {
    setShowCancelConfirmation(true);
  }

  function handleCancelConfirmed() {
    setName("");
    setTitle("");
    setBody("");
    setShowCancelConfirmation(false);
  }

  /*----------------------------------------------------------------------------*/

  /*-----------------------------------pressing Done ----------------------------*/

  function onDoneClick() {
    setShowDoneConfirmation(true);
  }

  function handleDoneConfirmed() {
    const newPost = { name: name, title: title, body: body, id: uuidv4() };
    setPosts([...posts, newPost]);
    navigate(HOME_ROUTE);
    setName("");
    setTitle("");
    setBody("");
    setShowDoneConfirmation(false);
  }

  function keepAdditing() {
    setShowCancelConfirmation(false);
    setShowDoneConfirmation(false);
  }
  /*----------------------------------------------------------------------------*/

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-200 to-blue-300">
      <textarea
        className="w-96 h-20 border border-gray-700 rounded-md p-2 m-5"
        placeholder="Write your name here..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></textarea>
      <textarea
        className="w-96 h-20 border border-gray-700 rounded-md p-2 m-5"
        placeholder="Write your post title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>
      <textarea
        className="w-96 h-40 border border-gray-700 rounded-md p-2 m-5"
        placeholder="Write your post here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <div className="mt-4 flex justify-end">
        <button
          className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={onCancelClick}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onDoneClick}
        >
          Done
        </button>
      </div>
      {showCancelConfirmation && (
        <ModalCancelConfirm
          keepAdditing={keepAdditing}
          handleCancelConfirmed={handleCancelConfirmed}
        />
      )}
      {showDoneConfirmation && (
        <ModalDoneConfirm
          keepAdditing={keepAdditing}
          handleDoneConfirmed={handleDoneConfirmed}
        />
      )}
    </div>
  );
}
