import React from "react";

import { useLocation } from "react-router-dom";

export default function DetailedPost() {
  const location = useLocation();
  const post = location.state?.post;
  console.log(JSON.stringify(post) + " post");
  return (
    <>
      <div style={{ backgroundColor: "green" }}>
        <h2>Title: {post.title}</h2>
        <p>Name: {post.name}</p>
        <p>Post:{post.post}</p>
      </div>
    </>
  );
}
