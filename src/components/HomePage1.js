import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DETAILS_ROUTE } from "../constants/routes";
import {
  BUTTON_COLOR,
  POST_BACKGROUND_COLOR,
  LABELS_COLOR,
  TEXT_COLOR,
  HOVER_BUTTON,
} from "../constants/colors";
import newBodyContext from "../context/newBodyContext";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [postCountForASinglePage, setPostCountForASinglePage] = useState(6);
  const [pageNumber, setPageNumber] = useState(1);
  const [countOfPages, setCountOfPages] = useState(0);
  const [additionalPage, setAdditionalPage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(newBodyContext);

  console.log(JSON.stringify(context) + " context");
  /*
{"newBody":"et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\n55555555555555"} context
  */

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

  /*------------------------------------------------------------------creating pages------------------------------------------------------------------------*/

  let indexOfTheLastPostOfThePage = pageNumber * postCountForASinglePage;
  let indexOfTheFirstPostOfThePage =
    indexOfTheLastPostOfThePage - postCountForASinglePage;
  let postsForSinglePage = posts.slice(
    indexOfTheFirstPostOfThePage,
    indexOfTheLastPostOfThePage
  );

  let pageButtonsContent = [];
  for (let i = 1; i <= countOfPages; i++) {
    pageButtonsContent.push(i);
  }

  useEffect(() => {
    const additionalPage = posts.length % postCountForASinglePage !== 0;
    if (additionalPage) {
      setCountOfPages(Math.ceil(posts.length / postCountForASinglePage));
    }
  }, [posts, postCountForASinglePage]);

  useEffect(() => {
    if (posts.length % postCountForASinglePage) {
      setCountOfPages(Math.trunc(posts.length / postCountForASinglePage) + 1);
      setAdditionalPage(true);
    } else {
      setCountOfPages(Math.trunc(posts.length / postCountForASinglePage));
    }
    if (additionalPage) {
      setPostCountForASinglePage(posts.length % postCountForASinglePage);
    }
  }, []);

  function changeThePage(page) {
    setPageNumber(page);
  }

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }
  function prevPage() {
    setPageNumber(pageNumber - 1);
  }

  // setIndexOfTheFirstPostOfThePage(indexOfTheFirstPostOfThePage + 10);
  // setIndexOfTheLastPostOfThePage(indexOfTheLastPostOfThePage + 10);

  //console.log(JSON.stringify(postsForSinglePage) + "postsForSinglePage");
  // const [indexOfTheFirstPostOfThePage, setIndexOfTheFirstPostOfThePage] =
  //   useState(1);
  // const [indexOfTheLastPostOfThePage, setIndexOfTheLastPostOfThePage] =
  //   useState(10);

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/

  return (
    <div className=" flex posts-center justify-center align-center h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <div className="flex flex-col justify-center">
        <div className="p-6 h-[75vh] w-[70vw] flex flex-col justify-center overflow-y-auto overflow-x-auto bg-white bg-opacity-40 rounded-lg">
          {postsForSinglePage.map((post) => (
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
          ))}

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

        <div className="flex justify-center m-5">
          {/* Pagination */}
          <nav
            className="isolate inline-flex -space-x-px rounded-lg"
            aria-label="Pagination"
          >
            {/*------leftArrow-----*/}
            <button
              onClick={prevPage}
              disabled={pageNumber === 1}
              className={`relative inline-flex bg-gray-800 posts-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                pageNumber === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            {/*---------------------*/}
            {/* Render page numbers */}
            {pageButtonsContent.map((pageButton, indexOfButton) => {
              return (
                <button
                  onClick={() => changeThePage(indexOfButton + 1)}
                  className={`relative inline-flex posts-center ${
                    indexOfButton + 1 === pageNumber
                      ? "bg-gray-800  text-white focus-visible:outline focus-visible:outline-5 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  } bg-gray-500 px-4 py-2  text-sm font-semibold`}
                >
                  {pageButton}
                </button>
              );
            })}
            {/*---------------------*/}
            {/*------rightArrow-----*/}
            <button
              onClick={nextPage}
              disabled={indexOfTheLastPostOfThePage == posts.length}
              className={`relative inline-flex bg-gray-800 posts-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                indexOfTheLastPostOfThePage >= posts.length &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            {/*---------------------*/}
          </nav>
        </div>
      </div>
    </div>
  );
}
