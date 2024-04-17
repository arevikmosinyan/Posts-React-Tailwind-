import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../constants/constant";

export default function CreateANewPost() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [createdPosts, setCreatedPosts] = useState([]);
  const [initial, setInitial] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));
    if (savedPosts) {
      setCreatedPosts(savedPosts);
    }
  }, []);

  function handleCancel() {
    console.log("canceled");
  }

  function handleDone() {
    const newPost = { name: name, title: title, post: post };
    setCreatedPosts([...createdPosts, newPost]);
    // navigate(HOME_ROUTE, { state: { createdPosts: createdPosts } });
    setName("");
    setTitle("");
    setPost("");
  }

  console.log(JSON.stringify(createdPosts) + " createdPosts in CreateANewPost");

  useEffect(() => {
    if (initial) {
      setInitial(false);
    } else {
      setTimeout(() => {
        navigate(HOME_ROUTE, { state: { createdPosts: createdPosts } });
        console.log(
          "navigate createdPosts  From CreateANewPost" +
            JSON.stringify(createdPosts)
        );
      }, 10000);
    }
  }, [createdPosts]);

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
      {createdPosts.map((elem) => {
        return <div>{JSON.stringify(elem)}</div>;
      })}
    </div>
  );
}
