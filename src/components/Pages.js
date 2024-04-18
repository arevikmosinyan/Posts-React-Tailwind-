import React from "react";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pages({ posts, handleDataFromChildPages }) {
  const [postCountForASinglePage, setPostCountForASinglePage] = useState(6);
  const [additionalPage, setAdditionalPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [countOfPages, setCountOfPages] = useState(0);
  const [indexOfTheLastPostOfThePage, setIndexOfTheLastPostOfThePage] =
    useState(6);
  const [indexOfTheFirstPostOfThePage, setIndexOfTheFirstPostOfThePage] =
    useState(1);
  const [postsForSinglePage, setPostsForSinglePage] = useState(
    posts.slice(indexOfTheFirstPostOfThePage, indexOfTheLastPostOfThePage)
  );
  /*------------------------------------------------------------------creating pages------------------------------------------------------------------------*/

  useEffect(() => {
    setIndexOfTheFirstPostOfThePage(
      indexOfTheLastPostOfThePage - postCountForASinglePage
    );
    setIndexOfTheLastPostOfThePage(pageNumber * postCountForASinglePage);
    setPostsForSinglePage(postsForSinglePage);
    handleDataFromChildPages(postsForSinglePage);
  }, [pageNumber, postCountForASinglePage]);

  // console.log(
  //   JSON.stringify(postsForSinglePage) + " postsForSinglePage in Pages page"
  // );
  // console.log(JSON.stringify(posts) + " posts in Pages");
  /*----------------------------------------------------------sending data to Home page-----------------------------------------------------------------------*/

  useEffect(() => {
    handleDataFromChildPages(postsForSinglePage);
  }, [postsForSinglePage]);

  /*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

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
  );
}
