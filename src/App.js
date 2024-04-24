import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import CreateANewPost from './components/CreateANewPost';
import DetailedPost from './components/DetailedPost';
import { DETAILS_ROUTE, CREATE_ROUTE, HOME_ROUTE } from './constants/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import postsContext from './context/postsContext';
import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    let canceled = false;
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((posts) => {
        if (!canceled) {
          setPosts(posts.map((post) => ({ ...post, allComments: [] })));
        }
      })
      .catch((error) => console.log(error.message));
    return () => (canceled = true);
  }, []);

  return (
    <postsContext.Provider value={{ posts: posts, setPosts: setPosts }}>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path={HOME_ROUTE} element={<HomePage />} />
          <Route path={CREATE_ROUTE} element={<CreateANewPost />} />
          <Route path={DETAILS_ROUTE} element={<DetailedPost />} />
          <Route path='*' element={<Navigate to={HOME_ROUTE} />} />
        </Routes>
      </div>
    </postsContext.Provider>
  );
}

export default App;
