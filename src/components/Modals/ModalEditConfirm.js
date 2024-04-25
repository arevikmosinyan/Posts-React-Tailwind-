import React, { useState } from "react";
import {
  BUTTON_COLOR,
  HOVER_BUTTON,
  BUTTON_DISABLED,
} from "../../constants/colors";

export default function ModalEditConfirm({
  onSave,
  handleCancelTheEditing,
  bodyOfPost,
}) {
  const [newBody, setNewBody] = useState(bodyOfPost);

  function handleSave() {
    onSave(newBody);
    handleCancelTheEditing();
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <textarea
          className="w-96 h-56 border border-gray-700 rounded-md p-2 mb-4"
          placeholder="Change your post here..."
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <button
            disabled={newBody.trim() === ""}
            className={`mr-2 px-4 py-2 ${
              newBody.trim() === "" ? BUTTON_DISABLED : BUTTON_COLOR
            }  text-white rounded hover:${HOVER_BUTTON}`}
            onClick={handleSave}
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
