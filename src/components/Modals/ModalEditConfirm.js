import React, { useEffect, useState } from "react";
import {
  BUTTON_COLOR,
  POST_BACKGROUND_COLOR,
  LABELS_COLOR,
  TEXT_COLOR,
  HOVER_BUTTON,
} from "../../constants/colors";

export default function ModalEditConfirm({
  handleCancelTheEditing,
  handleConfirmEditing,
  bodyOfPost,
  handleNewBodyFromModalEdit,
  pageNumber,
}) {
  const [newBody, setNewBody] = useState("");

  useEffect(() => {
    handleNewBodyFromModalEdit(newBody);
  }, [newBody]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <textarea
          className="w-96 h-56 border border-gray-700 rounded-md p-2 mb-4"
          placeholder="Change your post here..."
          value={newBody || bodyOfPost}
          onChange={(e) => setNewBody(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <button
            className={`mr-2 px-4 py-2 ${BUTTON_COLOR} text-white rounded hover:${HOVER_BUTTON}`}
            onClick={handleConfirmEditing}
          >
            Save
          </button>
          <button
            className={`px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600`}
            onClick={handleCancelTheEditing}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
