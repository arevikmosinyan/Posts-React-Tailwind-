import React, { useEffect } from "react";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [postCountForASinglePage, setPostCountForASinglePage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  let countOfPages = posts.length / postCountForASinglePage;
  let pages = [];

  // const [indexOfTheFirstPostOfThePage, setIndexOfTheFirstPostOfThePage] =
  //   useState(1);
  // const [indexOfTheLastPostOfThePage, setIndexOfTheLastPostOfThePage] =
  //   useState(10);

  useEffect(() => {
    let canceled = false;

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => {
        if (!canceled) {
          setPosts(posts);
        }
      })
      .catch((error) => console.log(error.message));

    return () => (canceled = true);
  }, []);

  let indexOfTheLastPostOfThePage = pageNumber * postCountForASinglePage;
  let indexOfTheFirstPostOfThePage =
    indexOfTheLastPostOfThePage - postCountForASinglePage;
  let postsForSinglePage = posts.slice(
    indexOfTheFirstPostOfThePage,
    indexOfTheLastPostOfThePage
  );

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }
  function prevPage() {
    setPageNumber(pageNumber - 1);
  }

  // setIndexOfTheFirstPostOfThePage(indexOfTheFirstPostOfThePage + 10);
  // setIndexOfTheLastPostOfThePage(indexOfTheLastPostOfThePage + 10);

  //console.log(JSON.stringify(postsForSinglePage) + "postsForSinglePage");

  return (
    <div className=" flex posts-center justify-center h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <div>
        <div className="flex flex-1 justify-between sm:hidden">
          {/* <button
            onClick={prevPage}
            disabled={pageNumber === 1}
            className={`relative inline-flex posts-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              pageNumber === 1 && "opacity-50 cursor-not-allowed"
            }`}
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button> */}
          {/* <button
            onClick={nextPage}
            disabled={indexOfTheLastPostOfThePage >= posts.length}
            className={`relative ml-3 inline-flex posts-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              indexOfTheLastPostOfThePage >= posts.length &&
              "opacity-50 cursor-not-allowed"
            }`}
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button> */}
        </div>
        <div className="p-6 h-[90vh] w-[70vw] overflow-y-auto overflow-x-auto bg-white bg-opacity-40 rounded-lg">
          <div className="font-bold text-2xl mb-4 text-center">Posts</div>
          {posts.map((post) => (
            <div key={post.id} className="mb-4 text-left">
              <div className="text-gray-600 mb-1">User ID: {post.id}</div>
              <div className="text-blue-700 font-bold mb-1">
                Title: {post.title}
              </div>
              <div className="text-gray-800">{post.body}</div>
            </div>
          ))}
        </div>

        {/* <div className="hidden sm:flex sm:flex-1 sm:posts-center sm:justify-between"> */}
        <div className="flex justify-center m-5">
          {/* Pagination */}
          <nav
            className="isolate inline-flex -space-x-px rounded-lg"
            aria-label="Pagination"
          >
            {/* <button
              onClick={prevPage}
              disabled={pageNumber === 1}
              className={`relative inline-flex bg-gray-800 posts-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                pageNumber === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button> */}
            {/* Render page numbers */}
            {pages.map((_, index) => {
              return <button>{index + 1}</button>;
            })}

            {/* {Array.from(
              { length: Math.ceil(posts.length / postCountForASinglePage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setPageNumber(i + 1)}
                  className={`relative inline-flex posts-center ${
                    i + 1 === pageNumber
                      ? "bg-gray-800  text-white focus-visible:outline focus-visible:outline-5 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  } bg-gray-500 px-4 py-2 mx-10 text-sm font-semibold`}
                >
                  {i + 1}
                </button>
              )
            )} */}
            {/* <button
              onClick={nextPage}
              disabled={indexOfTheLastPostOfThePage >= posts.length}
              className={`relative inline-flex bg-gray-800 posts-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                indexOfTheLastPostOfThePage >= posts.length &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
