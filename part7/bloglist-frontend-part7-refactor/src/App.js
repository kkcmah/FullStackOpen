import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Container from '@material-ui/core/Container'
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Header from "./components/Header";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import { loadUserLocalStorage } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserLocalStorage());
  }, []);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    if (user) dispatch(initializeBlogs());
  }, [user]);

  return (
    <Container>
      <Header></Header>
      <Routes>
        <Route path="/" element={user ? <Blogs /> : <Login></Login>} />
        <Route path="/users" element={<Users></Users>} />
        <Route path="/users/:id" element={<User></User>} />
        <Route path="/blogs/:id" element={<Blog></Blog>} />
      </Routes>
    </Container>
  );
};

export default App;
