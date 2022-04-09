import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import { loadUserLocalStorage } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserLocalStorage());
  }, []);

  useEffect(() => {
    if (user) dispatch(initializeBlogs());
  }, [user]);

  if (user === null) {
    return <Login></Login>;
  }
  return <Blogs></Blogs>;
};

export default App;
