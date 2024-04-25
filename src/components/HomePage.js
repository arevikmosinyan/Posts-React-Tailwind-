import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import postsContext from "../context/postsContext";
import { DETAILS_ROUTE } from "../constants/routes";
import { v4 as uuidv4 } from "uuid";
import {
  POST_BACKGROUND_COLOR,
  LABELS_COLOR,
  TEXT_COLOR,
  HOVER_BUTTON,
  BUTTON_COLOR,
} from "../constants/colors";
import Pages from "./Pages";

export default function HomePage() {
  const { posts } = useContext(postsContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [countOfPages, setCountOfPages] = useState(0);
  const [postCountForASinglePage, setPostCountForASinglePage] = useState(6);
  const [postsForSinglePage, setPostsForSinglePage] = useState([]);

  useEffect(() => {
    const pageCount = Math.ceil(posts?.length / postCountForASinglePage);
    setCountOfPages(pageCount);
  }, [posts, postCountForASinglePage]);

  useEffect(() => {
    const firstPostIndex = (pageNumber - 1) * postCountForASinglePage;
    const lastPostIndex = firstPostIndex + postCountForASinglePage;
    const slicedPosts = posts?.slice(firstPostIndex, lastPostIndex);
    setPostsForSinglePage(slicedPosts);
  }, [pageNumber, postCountForASinglePage, posts]);

  useEffect(() => {
    if (location.state?.initialPageNumber) {
      setPageNumber(location.state?.initialPageNumber);
    }
    if (location.state?.wasEdited) {
      const lastPageNumber = Math.ceil(posts?.length / postCountForASinglePage);
      setPageNumber(lastPageNumber);
    }
  }, []);

  function changeThePage(page) {
    setPageNumber(page);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <div className="flex flex-col items-center w-full max-w-7xl px-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-5  justify-center bg-white bg-opacity-40 rounded-lg p-3 min-h-[80vh] min-w-[80vw] ">
          {postsForSinglePage?.map((post) => (
            <div
              key={uuidv4()}
              className={`${POST_BACKGROUND_COLOR} relative  rounded-lg p-5 flex flex-col `}
            >
              <div className=" flex flex-col items-stretch my-4 text-left">
                <div className="my-1 flex">
                  <p className={`${LABELS_COLOR}`}>Title: </p>
                  <p className={`${TEXT_COLOR} mx-3`}> {post.title}</p>
                </div>
                <div className="my-1 flex">
                  <p className={`${LABELS_COLOR}`}>User ID : </p>
                  <p className={`${TEXT_COLOR} mx-3`}>{post.userId}</p>
                </div>

                <div
                  className={`${TEXT_COLOR} pr-10 text-justify indent-4 w-full  break-words`}
                >
                  {post.body}
                </div>
                <div className="my-1 flex">
                  <p className={`${LABELS_COLOR}`}>Post id: </p>
                  <p className={`${TEXT_COLOR} mx-3`}> {post.id}</p>
                </div>
                <div className="my-1 flex">
                  <p className={`${LABELS_COLOR}`}>
                    Comments: {post.allComments.length}
                  </p>
                  <p className={`${TEXT_COLOR} mx-3`}>
                    {post.allComments?.map((comment, index) => {
                      if (index >= 1) {
                        return null;
                      }
                      return comment + " :";
                    })}
                    {post.allComments?.length > 1 && (
                      <button
                        className={`mt-2 px-3 py-1 ${TEXT_COLOR} rounded cursor-pointer underline`}
                        onClick={() =>
                          navigate(DETAILS_ROUTE, {
                            state: {
                              post: post,
                              pageNumber: pageNumber,
                            },
                          })
                        }
                      >
                        ...More
                      </button>
                    )}
                  </p>
                </div>
              </div>

              <div>
                <button
                  className={`px-4 py-2 m-5 absolute bottom-0 right-0 ${BUTTON_COLOR} hover:${HOVER_BUTTON} border border-gray-400 text-white rounded `}
                  onClick={() => {
                    navigate(DETAILS_ROUTE, {
                      state: {
                        post: post,
                        pageNumber: pageNumber,
                      },
                    });
                  }}
                >
                  Detailes
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center m-5">
          <Pages
            pageNumber={pageNumber}
            countOfPages={countOfPages}
            changeThePage={changeThePage}
            nextPage={() => setPageNumber(pageNumber + 1)}
            prevPage={() => setPageNumber(pageNumber - 1)}
          />
        </div>
      </div>
    </div>
  );
}
