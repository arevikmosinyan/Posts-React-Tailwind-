import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { COMMENT_BACKGROUND, BUTTON_LIGHT_COLOR } from "../constants/colors";
import useModal from "../customHooks/useModal";
import ModalCommentDeleteConfirm from "./Modals/ModalCommentDelete";
import ModalCommentAddConfirm from "./Modals/ModalCommentAddConfirm";

export default function Comments({ userId }) {
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [indexOfComment, setIndexOfComment] = useState();
  const addCommentModal = useModal();
  const deleteCommentModal = useModal();

  function onAddComment() {
    setAllComments([...allComments, commentText].reverse());
    addCommentModal.closeModal();
    setCommentText("");
  }

  //   function handleKeyDown(event) {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       onAddComment();
  //     }
  //   }

  function onCancelComment() {
    deleteCommentModal.closeModal();
    addCommentModal.closeModal();
    setCommentText("");
  }

  function onDeleteCommentConfirm() {
    const updatedAllComments = allComments.filter(
      (comment, index) => index !== indexOfComment
    );
    setAllComments(updatedAllComments);
    deleteCommentModal.closeModal();
  }

  return (
    <>
      <div className="flex flex-col items-start w-full">
        <div className="flex">
          <div>
            <p className="font-bold p-3">{allComments.length} Comments</p>
            <textarea
              className="w-30vw h-20 border border-gray-700 rounded-md p-2 "
              placeholder="Write your comment here..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
          </div>
          {addCommentModal.isOpen && (
            <ModalCommentAddConfirm
              handleConfirmAdding={onAddComment}
              handleCancelAdding={onCancelComment}
            />
          )}
          <div className=" flex m-7 items-center">
            <button
              className={`px-4 py-2 ${BUTTON_LIGHT_COLOR} text-white rounded `}
              onClick={() => addCommentModal.openModal()}
            >
              Add
            </button>
          </div>
        </div>
        {deleteCommentModal.isOpen && (
          <ModalCommentDeleteConfirm
            handleConfirmDeleting={onDeleteCommentConfirm}
            handleCancelTheDeleting={onCancelComment}
          />
        )}
        <ul className="list-none">
          {allComments.map((comment, index) => {
            return (
              <li
                key={uuidv4()}
                className={`${COMMENT_BACKGROUND} flex justify-between items-center w-30vw break-words mb-4 p-4 rounded-lg`}
              >
                <p className="font-bold indent-4 text-justify">
                  Comment by {userId} :
                </p>
                <p className="indent-4 text-justify">{comment}</p>
                <button
                  className={`mt-2 px-3 py-1 ${BUTTON_LIGHT_COLOR} text-white rounded `}
                  onClick={() => {
                    deleteCommentModal.openModal();
                    setIndexOfComment(index);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
