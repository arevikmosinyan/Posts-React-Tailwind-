import React from "react";
import { useState } from "react";

export default function CreateANewPost() {
  const [post, setPost] = useState("");
  console.log(post);

  function handleCancel() {
    console.log("canceled");
  }
  function handleDone() {
    console.log("done");
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-200 to-blue-300">
      <textarea
        className="w-96 h-40 border border-gray-300 rounded-md p-2"
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>
      <div>{post}</div>
      <div className="mt-4 flex justify-end">
        <button
          className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleDone}
        >
          Done
        </button>
      </div>
    </div>
  );
}
