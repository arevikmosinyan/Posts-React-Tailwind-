import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newBodyContext from "../context/newBodyContext";
import idContextOfDeletingPost from "../context/deletingPostContext";
import { DETAILS_ROUTE } from "../constants/routes";
import {
  BUTTON_COLOR,
  POST_BACKGROUND_COLOR,
  LABELS_COLOR,
  TEXT_COLOR,
  HOVER_BUTTON,
} from "../constants/colors";
import Pages from "./Pages";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(newBodyContext);
  // pages

  const contextOfDeletingPost = useContext(idContextOfDeletingPost);
  const [pageNumber, setPageNumber] = useState(1);
  const [countOfPages, setCountOfPages] = useState(0);
  const [postCountForASinglePage, setPostCountForASinglePage] = useState(3);
  const [additionalPage, setAdditionalPage] = useState(false);
  const [indexOfTheFirstPostOfThePage, setIndexOfTheFirstPostOfThePage] =
    useState(0);
  const [indexOfTheLastPostOfThePage, setIndexOfTheLastPostOfThePage] =
    useState(3);
  const [postsForSinglePage, setPostsForSinglePage] = useState([]);

  /*------------------------------------------------------------local Storage----------------------------------------------------------------------*/

  // useEffect(() => {
  //   const savedPosts = JSON.parse(localStorage.getItem("posts"));
  //   if (savedPosts) {
  //     setPosts(savedPosts);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (location.state?.createdPosts) {
  //     const updatedPosts = [...posts, ...location.state?.createdPosts];
  //     setPosts(updatedPosts);
  //     localStorage.setItem("posts", JSON.stringify(updatedPosts));
  //     // if(context)
  //   }
  // }, [location.state?.createdPosts]);

  /*---------------------------------------------------------------------------------------------------------------------------------------------------*/

  /*-----------------------------------------------------------fetching from API----------------------------------------------------------------------- */
  useEffect(() => {
    let canceled = false;
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => {
        if (!canceled) {
          setPosts(posts);
          // console.log(JSON.stringify(posts) + " posts from API");
        }
      })
      .catch((error) => console.log(error.message));
    return () => (canceled = true);
  }, []);

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/
  // useEffect(() => {
  //   if (contextOfDeletingPost.idOfDeleteingPost) {
  //     posts.forEach((post) => {
  //       console.log(post.id);
  //     });
  //   }

  // let filteredPosts = posts.filter((post) => {
  //   return post.id !== contextOfDeletingPost.idOfDeleteingPost;
  // });
  //setPosts([...filteredPosts]);

  useEffect(() => {
    console.log("happy");

    posts.forEach((post) => {
      console.log(post.id);
    });
  }, []);

  /*-----------------------------------------------------------pages-----------------------------------------------------------------------------------------*/

  // Initialize pagination variables in a single useEffect to avoid unnecessary renders
  useEffect(() => {
    setIndexOfTheFirstPostOfThePage(0);
    setIndexOfTheLastPostOfThePage(postCountForASinglePage);
  }, [postCountForASinglePage]);

  // Update pagination state and slice posts when pageNumber or postCountForASinglePage changes
  useEffect(() => {
    const firstPostIndex = (pageNumber - 1) * postCountForASinglePage;
    const lastPostIndex = firstPostIndex + postCountForASinglePage;
    setIndexOfTheFirstPostOfThePage(firstPostIndex);
    setIndexOfTheLastPostOfThePage(lastPostIndex);

    // Slice posts based on updated indices
    const slicedPosts = posts.slice(firstPostIndex, lastPostIndex);
    setPostsForSinglePage(slicedPosts);
  }, [pageNumber, postCountForASinglePage, posts]);

  // Ensure countOfPages is updated correctly
  useEffect(() => {
    const pageCount = Math.ceil(posts.length / postCountForASinglePage);
    setCountOfPages(pageCount);
  }, [posts, postCountForASinglePage]);

  // Initialize countOfPages and postCountForASinglePage based on posts length
  useEffect(() => {
    const additionalPage = posts.length % postCountForASinglePage !== 0;
    setAdditionalPage(additionalPage);
    if (additionalPage) {
      setCountOfPages(Math.ceil(posts.length / postCountForASinglePage));
      // When changing postCountForASinglePage, ensure indexOfTheLastPostOfThePage is updated
      setIndexOfTheLastPostOfThePage(
        (posts.length % postCountForASinglePage) + indexOfTheFirstPostOfThePage
      );
    } else {
      setCountOfPages(Math.trunc(posts.length / postCountForASinglePage));
      // When changing postCountForASinglePage, ensure indexOfTheLastPostOfThePage is updated
      setIndexOfTheLastPostOfThePage(
        postCountForASinglePage + indexOfTheFirstPostOfThePage
      );
    }
  }, [
    posts,
    postCountForASinglePage,
    additionalPage,
    indexOfTheFirstPostOfThePage,
  ]);

  // //creating pages
  // useEffect(() => {
  //   setIndexOfTheFirstPostOfThePage(
  //     indexOfTheFirstPostOfThePage + postCountForASinglePage
  //   );
  //   setIndexOfTheLastPostOfThePage(
  //     indexOfTheLastPostOfThePage + postCountForASinglePage
  //   );

  //   setPostsForSinglePage(
  //     posts.slice(indexOfTheFirstPostOfThePage, indexOfTheLastPostOfThePage)
  //   );
  //   // handleDataFromChildPages(postsForSinglePage);
  // }, [pageNumber, postCountForASinglePage]);

  //
  let pageButtonsContent = [];
  for (let i = 1; i <= countOfPages; i++) {
    pageButtonsContent.push(i);
  }

  // useEffect(() => {
  //   const additionalPage = posts.length % postCountForASinglePage !== 0;
  //   if (additionalPage) {
  //     setCountOfPages(Math.ceil(posts.length / postCountForASinglePage));
  //   }
  // }, [posts, postCountForASinglePage]);

  // useEffect(() => {
  //   if (posts.length % postCountForASinglePage) {
  //     setCountOfPages(Math.trunc(posts.length / postCountForASinglePage) + 1);
  //     setAdditionalPage(true);
  //   } else {
  //     setCountOfPages(Math.trunc(posts.length / postCountForASinglePage));
  //   }
  //   if (additionalPage) {
  //     setPostCountForASinglePage(posts.length % postCountForASinglePage);
  //   }
  // }, []);

  function changeThePage(page) {
    setPageNumber(page);
  }

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }
  function prevPage() {
    setPageNumber(pageNumber - 1);
  }

  return (
    <div className=" flex posts-center justify-center align-center h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <div className="flex flex-col justify-center items-center">
        <div className="p-6 h-[80vh] w-[80vw] flex flex-col justify-center overflow-y-auto overflow-x-auto bg-white bg-opacity-40 rounded-lg">
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
                <div className="font-bold my-1 flex">
                  <p className={`${LABELS_COLOR}`}>Title: </p>
                  <p className={`${TEXT_COLOR} mx-3`}> {post.id}</p>
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
        {/* {
          <Pages
            posts={posts}
            handleDataFromChildPages={handleDataFromChildPages}
          />
        } */}
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
/*
please provide an example when on mounting the component is fetching a data, and then clicking on <filter> button , it is filtering the data with appropriate id
ChatGPT
Sure, here's an example scenario:

Let's say you have a React component called DataFetcher that fetches some data from an API when it mounts, and then you have a <Filter> button that filters the fetched data based on an ID.

jsx
Copy code
import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterId, setFilterId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      const fetchedData = await response.json();
      setData(fetchedData);
      setFilteredData(fetchedData); // Set filteredData initially with all data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilter = () => {
    const filtered = data.filter(item => item.id === filterId);
    setFilteredData(filtered);
  };

  const handleFilterInputChange = event => {
    setFilterId(event.target.value);
  };

  return (
    <div>
      <button onClick={handleFilter}>Filter</button>
      <input
        type="text"
        value={filterId}
        onChange={handleFilterInputChange}
        placeholder="Enter ID to filter"
      />
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
In this example:

The DataFetcher component fetches data from an API when it mounts using the useEffect hook.
When the data is fetched, it's stored in the data state.
Initially, filteredData state is set to contain all fetched data.
When the <Filter> button is clicked, it triggers the handleFilter function, which filters the data based on the filterId state.
The filtered data is stored in the filteredData state, causing a re-render with only the filtered items displayed.
You can integrate this DataFetcher component into your application wherever you need to fetch and filter data based on an ID.




*/
