import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newBodyContext from "../context/newBodyContext";
import { DETAILS_ROUTE } from "../constants/routes";
import {
  BUTTON_COLOR,
  POST_BACKGROUND_COLOR,
  LABELS_COLOR,
  TEXT_COLOR,
  HOVER_BUTTON,
} from "../constants/colors";
import Pages from "./Pages";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [countOfPages, setCountOfPages] = useState(0);
  const [postsForSinglePage, setPostsForSinglePage] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(newBodyContext);

  /*-----------------------------------------------------------getting data from child pages-----------------------------------------------------*/

  function handleDataFromChildPages(data) {
    setPostsForSinglePage(data);
  }
  console.log(postsForSinglePage + " postsForSinglePage in home page"); //
  /*-----------------------------------------------------------------------------------------------------------------------------------------------*/

  /*------------------------------------------------------------local Storage----------------------------------------------------------------------*/

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));
    if (savedPosts) {
      setPosts(savedPosts);
    }
  }, []);

  useEffect(() => {
    if (location.state?.createdPosts) {
      const updatedPosts = [...posts, ...location.state?.createdPosts];
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      // if(context)
    }
  }, [location.state?.createdPosts]);

  /*---------------------------------------------------------------------------------------------------------------------------------------------------*/

  /*-----------------------------------------------------------fetching from API----------------------------------------------------------------------- */
  useEffect(() => {
    let canceled = false;
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => {
        if (!canceled) {
          setPosts(posts);
          console.log(JSON.stringify(posts) + " posts from API");
        }
      })
      .catch((error) => console.log(error.message));
    return () => (canceled = true);
  }, []);

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/

  return (
    <div className=" flex posts-center justify-center align-center h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <div className="flex flex-col justify-center">
        <div className="p-6 h-[75vh] w-[70vw] flex flex-col justify-center overflow-y-auto overflow-x-auto bg-white bg-opacity-40 rounded-lg">
          {/* {postsForSinglePage.map((post) => (
            <div
              className={`${POST_BACKGROUND_COLOR} mb-6 p-5 rounded-lg flex`}
            >
              <div key={post.id} className="my-4 text-left">
                <div className="font-bold my-1 flex">
                  <p className={`${LABELS_COLOR}`}>User ID: </p>
                  <p className={`${TEXT_COLOR} mx-3`}>{post.userId}</p>
                </div>
                <div className="font-bold my-1 flex">
                  <p className={`${LABELS_COLOR}`}>Title: </p>
                  <p className={`${TEXT_COLOR} mx-3`}> {post.title}</p>
                </div>

                {context && context.idOfNewBody === post.id ? (
                  <div className={`${TEXT_COLOR}`}>{context.newBody}</div>
                ) : (
                  <div className={`${TEXT_COLOR}`}>{post.body}</div>
                )}
              </div>

              <div>
                <button
                  className={`px-4 py-2 ${BUTTON_COLOR} text-white rounded hover:${HOVER_BUTTON}`}
                  onClick={() =>
                    navigate(DETAILS_ROUTE, { state: { post: post } })
                  }
                >
                  Detailes
                </button>
              </div>
            </div>
          ))} */}

          {pageNumber === countOfPages &&
            location.state?.createdPosts.map((createdPost) => (
              <div className="bg-red-500 mb-6 p-5 rounded-lg flex">
                <div key={createdPost.name} className="mb-4 text-left">
                  <div className="text-gray-600 mb-1">
                    User ID: {createdPost.name}
                  </div>
                  <div className="text-blue-700 font-bold mb-1">
                    Title: {createdPost.title}
                  </div>
                  <div className="text-gray-800">{createdPost.body}</div>
                </div>

                <div>
                  <button
                    className={`px-4 py-2 ${BUTTON_COLOR} text-white rounded hover:${HOVER_BUTTON}`}
                    onClick={() =>
                      navigate(DETAILS_ROUTE, { state: { post: createdPost } })
                    }
                  >
                    Detailes
                  </button>
                </div>
              </div>
            ))}
        </div>
        {
          <Pages
            posts={posts}
            handleDataFromChildPages={handleDataFromChildPages}
          />
        }
      </div>
    </div>
  );
}
