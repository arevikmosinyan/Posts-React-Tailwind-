import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../constants/routes";
import ModalCancelConfirm from "././Modals/ModalCancelConfirm";
import ModalDoneConfirm from "././Modals/ModalDoneConfirm";
import {
  BUTTON_COLOR,
  BUTTON_LIGHT_COLOR,
  HOVER_BUTTON,
  HOVER_BUTTON_LIGHT,
} from "../constants/colors";
import postsContext from "../context/postsContext";
import { v4 as uuidv4 } from "uuid";

export default function CreateANewPost() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [wasEdited, setWasEdited] = useState(true);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showDoneConfirmation, setShowDoneConfirmation] = useState(false);
  const { posts } = useContext(postsContext);
  const { setPosts } = useContext(postsContext);
  const navigate = useNavigate();

  function onCancelClick() {
    setShowCancelConfirmation(true);
  }

  function onDoneClick() {
    setShowDoneConfirmation(true);
  }

  function handleCancelConfirmed() {
    setName("");
    setTitle("");
    setBody("");
    setShowCancelConfirmation(false);
  }

  function handleDoneConfirmed() {
    const newPost = { name: name, title: title, body: body, id: uuidv4() };
    setPosts([...posts, newPost]);
    navigate(HOME_ROUTE, {
      state: { wasEdited: wasEdited },
    });

    setName("");
    setTitle("");
    setBody("");
    setShowDoneConfirmation(false);
  }

  function keepAdditing() {
    setShowCancelConfirmation(false);
    setShowDoneConfirmation(false);
  }

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
          className={`mr-2 px-4 py-2 ${BUTTON_LIGHT_COLOR} text-white rounded hover:${HOVER_BUTTON_LIGHT}`}
          onClick={onCancelClick}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 ${BUTTON_COLOR} text-white rounded hover:${HOVER_BUTTON}`}
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
