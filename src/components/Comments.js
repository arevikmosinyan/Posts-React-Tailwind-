import React, { useState, useContext } from 'react';
import {
  COMMENT_BACKGROUND,
  BUTTON_COLOR,
  BUTTON_DISABLED,
  TEXT_COLOR,
} from '../constants/colors';
import useModal from '../customHooks/useModal';
import SharedModal from './Modals/SharedModal';
import postsContext from '../context/postsContext';
import { v4 as uuidv4 } from 'uuid';

export default function Comments({ userId, postId }) {
  const [commentText, setCommentText] = useState('');
  const [indexOfComment, setIndexOfComment] = useState();
  const [showAllComments, setShowAllComments] = useState(false);
  const { posts } = useContext(postsContext);
  const { setPosts } = useContext(postsContext);
  const addCommentModal = useModal();
  const deleteCommentModal = useModal();

  const targetPost = posts?.find((post) => post.id === postId);

  function onAddComment() {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, allComments: [...post.allComments, commentText] };
        } else {
          return post;
        }
      }),
    );
    closeModalsAndResetStates();
  }

  //   function handleKeyDown(event) {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       onAddComment();
  //     }
  //   }

  function onDeleteCommentConfirm() {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            allComments: post?.allComments.filter(
              (comment, index) => index !== indexOfComment,
            ),
          };
        } else {
          return post;
        }
      }),
    );
    closeModalsAndResetStates();
  }

  function closeModalsAndResetStates() {
    deleteCommentModal.closeModal();
    addCommentModal.closeModal();
    setCommentText('');
  }

  return (
    <>
      <div className='flex flex-col items-start w-full'>
        <div className='flex'>
          <div>
            <p className='font-bold p-3'>
              {targetPost?.allComments.length} Comments
            </p>
            <textarea
              className='w-30vw h-20 border border-gray-700 rounded-md p-2 '
              placeholder='Write your comment here...'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}></textarea>
          </div>
          {addCommentModal.isOpen && (
            <SharedModal
              handleModalConfirm={onAddComment}
              handleModalCancel={closeModalsAndResetStates}
              modalText='Are you sure you want to add this comment?'
              confirmButtonText='Yes, add'
              cancelButtonText='No, skip'
            />
          )}
          <div className=' flex ml-7 mt-7 items-center'>
            <button
              disabled={commentText.trim() === ''}
              className={`px-4 py-2 ${
                commentText.trim() === '' ? BUTTON_DISABLED : BUTTON_COLOR
              } text-white border border-gray-500 rounded `}
              onClick={() => addCommentModal.openModal()}>
              Add
            </button>
          </div>
        </div>
        {deleteCommentModal.isOpen && (
          <SharedModal
            handleModalConfirm={onDeleteCommentConfirm}
            handleModalCancel={closeModalsAndResetStates}
            modalText='Are you sure you want to delete this comment?'
            confirmButtonText='Yes, delete'
            cancelButtonText='No'
          />
        )}
        <ul className='list-none'>
          {targetPost?.allComments?.map((comment, index) => {
            if (index >= 2 && !showAllComments) {
              return null;
            }
            return (
              <li
                key={uuidv4()}
                className={`${COMMENT_BACKGROUND} flex justify-between items-center w-30vw break-words mb-4 p-4 rounded-lg`}>
                <p className='indent-4 text-justify'>Comment by {userId} :</p>
                <p className='indent-4 text-justify'>{comment}</p>
                <button
                  className={`mt-2 px-3 py-1 ${BUTTON_COLOR} text-white rounded `}
                  onClick={() => {
                    deleteCommentModal.openModal();
                    setIndexOfComment(index);
                  }}>
                  Delete
                </button>
              </li>
            );
          })}
          {targetPost?.allComments.length > 2 && (
            <span
              className={`mt-2 px-3 py-1 ${TEXT_COLOR} rounded cursor-pointer underline`}
              onClick={() => setShowAllComments(!showAllComments)}>
              {showAllComments ? '...Less' : '...More'}
            </span>
          )}
        </ul>
      </div>
    </>
  );
}
