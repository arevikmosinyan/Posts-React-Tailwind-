import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import newBodyContext from '../context/newBodyContext';
import idOfDeletingPostContext from '../context/deletingPostContext';
import { DETAILS_ROUTE } from '../constants/routes';
import { v4 as uuidv4 } from 'uuid';
import {
  BUTTON_COLOR,
  POST_BACKGROUND_COLOR,
  LABELS_COLOR,
  TEXT_COLOR,
  HOVER_BUTTON,
} from '../constants/colors';
import Pages from './Pages';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const newBodyFromContext = useContext(newBodyContext);
  const idOfDeletingPostFromContext = useContext(idOfDeletingPostContext);
  // pages

  const [pageNumber, setPageNumber] = useState(1);
  const [countOfPages, setCountOfPages] = useState(0);
  const [postCountForASinglePage, setPostCountForASinglePage] = useState(3);
  const [additionalPage, setAdditionalPage] = useState(false);
  const [indexOfTheFirstPostOfThePage, setIndexOfTheFirstPostOfThePage] =
    useState(0);
  const [indexOfTheLastPostOfThePage, setIndexOfTheLastPostOfThePage] =
    useState(3);
  const [postsForSinglePage, setPostsForSinglePage] = useState([]);
  const [initial, setInitial] = useState(true);

  /*------------------------------------------------------------local Storage----------------------------------------------------------------------*/

  // useEffect(() => {
  //   if (localStorage.getItem('todolist')) {
  //     setTodoList(JSON.parse(localStorage.getItem('todolist') || []));
  //   }
  // }, []);

  useEffect(() => {
    if (localStorage.getItem('posts')) {
      setPosts(JSON.parse(localStorage.getItem('posts') || []));
    }
  }, []);

  useEffect(() => {
    if (!initial) {
      setInitial(true);
    } else {
      localStorage.setItem('posts', JSON.stringify(posts));
    }
  }, [posts]);

  // useEffect(() => {
  //   if (idOfDeletingPostFromContext.idOfDeleteingPost) {
  //     console.log(111111);
  //     const updatedPostsAfterFiltering = posts.filter((post) => {
  //       console.log(22222);
  //       return post.id !== idOfDeletingPostFromContext.idOfDeleteingPost;
  //     });
  //     setPosts(updatedPostsAfterFiltering);
  //     console.log(JSON.stringify(posts) + ' posts2');
  //   }
  // }, [idOfDeletingPostFromContext.idOfDeleteingPost]);

  // useEffect(() => {
  //   console.log(JSON.stringify(posts) + ' posts1');

  //   console.log(JSON.stringify(posts) + ' posts3');
  //   if (location.state?.createdPosts) {
  //     const updatedPosts = [...posts, ...location.state?.createdPosts];
  //     setPosts(updatedPosts);
  //     console.log(JSON.stringify(posts) + ' posts4');
  //     localStorage.setItem('posts', JSON.stringify(updatedPosts));
  //     console.log(JSON.stringify(posts) + ' posts5');
  //     // if(context)new body-ov pahi datan local storage-um
  //   }
  // }, [
  //   location.state?.createdPosts,
  //   idOfDeletingPostFromContext.idOfDeleteingPost,
  // ]);

  /*---------------------------------------------------------------------------------------------------------------------------------------------------*/
  /* parz tarberak jnjelu, global pahelu poxaren , henc hom-ic tvyal post-id -n tal detailedPost-in, u delete sexmelu depqum, home
 page-um filterer, 
 */

  // function onRemoveClick(id) {
  //   setTodoId(id);
  //   setOpen(true);
  // }

  // function onConfirmDeleteItem() {
  //   setTodoList(todolist.filter((elem) => elem.id !== todoId));
  //   setOpen(false);
  // }

  /*-----------------------------------------------------------fetching from API----------------------------------------------------------------------- */
  useEffect(() => {
    let canceled = false;
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((posts) => {
        if (!canceled) {
          // if (idOfDeletingPostFromContext.idOfDeleteingPost) {
          //   setPosts(
          //     posts.filter((post) => {
          //       return (
          //         post.id !== idOfDeletingPostFromContext.idOfDeleteingPost
          //       );
          //     }),
          //   );
          // } else {
          //   setPosts(posts);
          // }
          setPosts(posts);
        }
      })
      .catch((error) => console.log(error.message));
    return () => (canceled = true);
  }, []);

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/

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
        (posts.length % postCountForASinglePage) + indexOfTheFirstPostOfThePage,
      );
    } else {
      setCountOfPages(Math.trunc(posts.length / postCountForASinglePage));
      // When changing postCountForASinglePage, ensure indexOfTheLastPostOfThePage is updated
      setIndexOfTheLastPostOfThePage(
        postCountForASinglePage + indexOfTheFirstPostOfThePage,
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
    <div className=' flex posts-center justify-center align-center h-screen bg-gradient-to-r from-blue-200 to-purple-300'>
      <div className='flex flex-col justify-center items-center'>
        <div className='p-6 h-[80vh] w-[80vw] flex flex-col justify-center overflow-y-auto overflow-x-auto bg-white bg-opacity-40 rounded-lg'>
          {postsForSinglePage.map((post) => (
            <div
              key={uuidv4()}
              className={`${POST_BACKGROUND_COLOR} mb-6 p-5 rounded-lg flex`}>
              <div className='my-4 text-left'>
                <div className='font-bold my-1 flex'>
                  <p className={`${LABELS_COLOR}`}>User ID: </p>
                  <p className={`${TEXT_COLOR} mx-3`}>{post.userId}</p>
                </div>
                <div className='font-bold my-1 flex'>
                  <p className={`${LABELS_COLOR}`}>Title: </p>
                  <p className={`${TEXT_COLOR} mx-3`}> {post.title}</p>
                </div>
                <div className='font-bold my-1 flex'>
                  <p className={`${LABELS_COLOR}`}>Post id: </p>
                  <p className={`${TEXT_COLOR} mx-3`}> {post.id}</p>
                </div>

                {newBodyFromContext &&
                newBodyFromContext.idOfNewBody === post.id ? (
                  <div className={`${TEXT_COLOR}`}>
                    {newBodyFromContext.newBody}
                  </div>
                ) : (
                  <div className={`${TEXT_COLOR}`}>{post.body}</div>
                )}
              </div>

              <div>
                <button
                  className={`px-4 py-2 ${BUTTON_COLOR} text-white rounded hover:${HOVER_BUTTON}`}
                  onClick={() =>
                    navigate(DETAILS_ROUTE, { state: { post: post } })
                  }>
                  Detailes
                </button>
              </div>
            </div>
          ))}

          {pageNumber === countOfPages &&
            location.state?.createdPosts.map((createdPost) => (
              <div className='bg-red-500 mb-6 p-5 rounded-lg flex'>
                <div key={uuidv4()} className='mb-4 text-left'>
                  <div className='text-gray-600 mb-1'>
                    User ID: {createdPost.name}
                  </div>
                  <div className='text-blue-700 font-bold mb-1'>
                    Title: {createdPost.title}
                  </div>
                  <div className='text-gray-800'>{createdPost.body}</div>
                </div>

                <div>
                  <button
                    className={`px-4 py-2 ${BUTTON_COLOR} text-white rounded hover:${HOVER_BUTTON}`}
                    onClick={() =>
                      navigate(DETAILS_ROUTE, { state: { post: createdPost } })
                    }>
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
        <div className='flex justify-center m-5'>
          {/* Pagination */}
          <nav
            className='isolate inline-flex -space-x-px rounded-lg'
            aria-label='Pagination'>
            {/*------leftArrow-----*/}
            <button
              onClick={prevPage}
              disabled={pageNumber === 1}
              className={`relative inline-flex bg-gray-800 posts-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                pageNumber === 1 && 'opacity-50 cursor-not-allowed'
              }`}>
              <ChevronLeftIcon className='h-5 w-5' />
            </button>
            {/*---------------------*/}
            {/* Render page numbers */}
            {pageButtonsContent.map((pageButton, indexOfButton) => {
              return (
                <button
                  key={uuidv4()}
                  onClick={() => changeThePage(indexOfButton + 1)}
                  className={`relative inline-flex posts-center ${
                    indexOfButton + 1 === pageNumber
                      ? 'bg-gray-800  text-white focus-visible:outline focus-visible:outline-5 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                  } bg-gray-500 px-4 py-2  text-sm font-semibold`}>
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
                'opacity-50 cursor-not-allowed'
              }`}>
              <ChevronRightIcon className='h-5 w-5' />
            </button>
            {/*---------------------*/}
          </nav>
        </div>
      </div>
    </div>
  );
}