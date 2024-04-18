import React, { useState, useContext } from "react";
import {
  BUTTON_COLOR,
  POST_BACKGROUND_COLOR,
  LABELS_COLOR,
  TEXT_COLOR,
  HOVER_BUTTON,
} from "../constants/colors";
import { useLocation } from "react-router-dom";
import newBodyContext from "../context/newBodyContext";

export default function DetailedPost() {
  const location = useLocation();
  const [newBody, setNewBody] = useState(location.state?.post.body);
  const [idOfNewBody, setIdOfNewBody] = useState(location.state?.post.id);
  const context = useContext(newBodyContext);

  function handleEdit() {
    context.setNewBody(newBody);
    context.setIdOfNewBody(idOfNewBody);
  }

  return (
    <>
      <div className=" flex flex-col posts-center   h-screen bg-gradient-to-r from-blue-200 to-purple-300">
        <div className="flex justify-end m-10">
          <button
            className={`px-4 py-2 ${BUTTON_COLOR} text-white rounded hover:${HOVER_BUTTON} `}
          >
            Delete the post
          </button>
        </div>
        <div
          className={`${POST_BACKGROUND_COLOR} m-20 p-5 rounded-lg flex items-center border-2 border-slate-600`}
        >
          <div className="m-10 ">
            <div className="m-8">
              <p className={`${LABELS_COLOR} font-bold mb-1`}> Title:</p>
              <p className={`${TEXT_COLOR} `}>{location.state?.post.title}</p>
            </div>
            {location.state?.post.userId && (
              <div className="my-5 ">
                <p className={`${LABELS_COLOR} font-bold mb-1`}>Name: </p>
                <p className={`${TEXT_COLOR} `}>
                  {location.state?.post.userId}
                </p>
              </div>
            )}
            {location.state?.post.name && (
              <div className="my-5 ">
                <p className={`${LABELS_COLOR} font-bold mb-1`}>
                  Name of Author:
                </p>
                <p className={`${TEXT_COLOR} `}>{location.state?.post.name}</p>
              </div>
            )}

            <div className="my-5">
              <p className={`${LABELS_COLOR} font-bold mb-1`}>Post:</p>
              <p className={`${TEXT_COLOR} `}>{newBody}</p>
              <textarea
                className="w-96 h-40 border border-gray-700 rounded-md p-2 m-5"
                placeholder="Change your post here..."
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
              ></textarea>

              <button
                className={`px-4 py-2 ${BUTTON_COLOR} text-white rounded hover:${HOVER_BUTTON}`}
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p>Comments</p>
          <textarea
            className="w-96 h-40 border border-gray-700 rounded-md p-2 m-5"
            placeholder="Write your comment here..."
          ></textarea>
          <div className="mt-4 flex justify-end">
            <button className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
