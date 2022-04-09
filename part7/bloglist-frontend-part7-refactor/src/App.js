import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
//import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Header from "./components/Header";
import { loadUserLocalStorage } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import Users from "./components/Users";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserLocalStorage());
  }, []);

  useEffect(() => {
    if (user) dispatch(initializeBlogs());
  }, [user]);

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={user ? <Blogs /> : <Login></Login>} />
        <Route path="/users" element={<Users></Users>} />
      </Routes>
    </div>
  );
};

export default App;
