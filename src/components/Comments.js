import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { COMMENT_BACKGROUND } from "../constants/colors";

export default function Comments({ userId }) {
  const [commentText, setCommentText] = useState("");
  const [allComments, setAllComments] = useState([]);

  function onAddComment() {
    setAllComments([...allComments, commentText].reverse());
    setCommentText("");
  }

  //   function handleKeyDown(event) {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       onAddComment();
  //     }
  //   }

  function onCancelComment() {
    setCommentText("");
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
          <div className=" flex m-7 items-center">
            <button
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={onCancelComment}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={onAddComment}
            >
              Add
            </button>
          </div>
        </div>

        <ul className="list-none">
          {allComments.map((comment) => {
            return (
              <li
                key={uuidv4()}
                className={`${COMMENT_BACKGROUND} w-30vw break-words mb-4 p-4 rounded-lg`}
              >
                <p className="font-bold indent-4 text-justify">
                  Comment by {userId} :
                </p>
                <p className="indent-4 text-justify">{comment}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
