import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import blogsService from "./services/blogs";

const App = () => {
  const [msg, setMsg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const locStoUser = window.localStorage.getItem("user");
    if (locStoUser) {
      const userParsed = JSON.parse(locStoUser);
      setUser(userParsed);
      blogsService.setToken(userParsed.token);
    }
  }, []);

  const handleUserLogin = (loginUser) => {
    blogsService.setToken(loginUser.token);
    setUser(loginUser);
    window.localStorage.setItem("user", JSON.stringify(loginUser));
  };

  const handleUserLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const setErrorMessage = (errorMsg) => {
    setMsg(errorMsg);
    console.log(errorMsg);
  };

  if (user === null) {
    return (
      <Login
        handleUserLogin={handleUserLogin}
        setErrorMessage={setErrorMessage}
      ></Login>
    );
  }
  return <Blogs user={user} handleUserLogout={handleUserLogout}></Blogs>;
};

export default App;
