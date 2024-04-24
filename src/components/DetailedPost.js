import React, { useState, useContext } from 'react';
import {
  BUTTON_COLOR,
  POST_BACKGROUND_COLOR,
  LABELS_COLOR,
  TEXT_COLOR,
  HOVER_BUTTON,
  BUTTON_LIGHT_COLOR,
} from '../constants/colors';
import { useLocation } from 'react-router-dom';
import ModalEditConfirm from '././Modals/ModalEditConfirm';
import Comments from './Comments';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../constants/routes';
import useModal from '../customHooks/useModal';
import postsContext from '../context/postsContext';
import SharedModal from './Modals/SharedModal';

export default function DetailedPost() {
  const location = useLocation();
  const { setPosts } = useContext(postsContext);
  const { posts } = useContext(postsContext);
  const [bodyOfPost, setBodyOfPost] = useState(location.state?.post.body);
  const [newBodyFromModalEdit, setNewBodyFromModalEdit] = useState('');
  const navigate = useNavigate();
  const deleteModal = useModal();
  const editModal = useModal();

  function handleNewBodyFromModalEdit(data) {
    setNewBodyFromModalEdit(data);
  }

  function handleConfirmDeleting() {
    setPosts(posts.filter((post) => post.id !== location.state?.post.id));
    handleReturnTheLeftPage();
    deleteModal.closeModal();
  }

  function handleConfirmEditing() {
    setPosts(
      posts.map((post) => {
        if (post.id === location.state?.post.id) {
          post.body = newBodyFromModalEdit;
        }
        return post;
      }),
    );
    editModal.closeModal();
  }

  function handleReturnTheLeftPage() {
    navigate(HOME_ROUTE, {
      state: { initialPageNumber: location.state?.pageNumber },
    });
  }

  return (
    <>
      <div className=' flex flex-col posts-center   min-h-screen bg-gradient-to-r from-blue-200 to-purple-300'>
        {deleteModal.isOpen && (
          <SharedModal
            handleModalConfirm={handleConfirmDeleting}
            handleModalCancel={deleteModal.closeModal}
            modalText='Are you sure you want to delete this post?'
            confirmButtonText='Yes, delete'
            cancelButtonText='No'
          />
        )}
        <div className='flex m-5 ml-10 items-start'>
          <button
            className={`px-4 py-2 ${BUTTON_COLOR} text-white rounded hover:${HOVER_BUTTON} `}
            onClick={deleteModal.openModal}>
            Delete the post
          </button>
        </div>
        <div className='flex ml-10 items-start'>
          <button
            className={`px-10 py-2 ${BUTTON_LIGHT_COLOR} text-white rounded hover:${HOVER_BUTTON} `}
            onClick={handleReturnTheLeftPage}>
            Go back
          </button>
        </div>
        <div className='flex'>
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <div
              className={`${POST_BACKGROUND_COLOR} w-1/2 m-10  rounded-lg flex items-center border-2 border-slate-600`}>
              <div className='m-5 w-full'>
                <div className='m-8'>
                  <p className={`${LABELS_COLOR} font-bold mb-1`}> Title:</p>
                  <p className={`${TEXT_COLOR} `}>
                    {location.state?.post.title}
                  </p>
                </div>
                <div className='m-8'>
                  <p className={`${LABELS_COLOR} font-bold mb-1`}> post id:</p>
                  <p className={`${TEXT_COLOR} `}>{location.state?.post.id}</p>
                </div>
                {location.state?.post.userId && (
                  <div className='my-5 '>
                    <p className={`${LABELS_COLOR} font-bold mb-1`}>Name: </p>
                    <p className={`${TEXT_COLOR} `}>
                      {location.state?.post.userId}
                    </p>
                  </div>
                )}
                {location.state?.post.name && (
                  <div className='my-5 '>
                    <p className={`${LABELS_COLOR} font-bold mb-1`}>
                      Name of Author:
                    </p>
                    <p className={`${TEXT_COLOR} `}>
                      {location.state?.post.name}
                    </p>
                  </div>
                )}

                <div className='my-5'>
                  <div className='m-15 w-full'>
                    <p className={`${LABELS_COLOR} font-bold m-7`}>Post:</p>
                    <p
                      className={`${TEXT_COLOR}  text-justify indent-4 w-20vw break-words`}>
                      {newBodyFromModalEdit || bodyOfPost}
                    </p>
                  </div>

                  <button
                    className={`px-4 py-2 m-10 ${BUTTON_COLOR} text-white rounded hover:${HOVER_BUTTON}`}
                    onClick={editModal.openModal}>
                    Edit
                  </button>
                  {editModal.isOpen && (
                    <ModalEditConfirm
                      pageNumber={location.state?.pageNumber}
                      handleCancelTheEditing={editModal.closeModal}
                      handleConfirmEditing={handleConfirmEditing}
                      bodyOfPost={bodyOfPost}
                      handleNewBodyFromModalEdit={handleNewBodyFromModalEdit}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='m-10 w-1/2'>
            <Comments
              userId={location.state?.post.userId}
              postId={location.state?.post.id}
            />
          </div>
        </div>
      </div>
    </>
  );
}
