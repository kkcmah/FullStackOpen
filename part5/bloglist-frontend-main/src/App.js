import React, { useState } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import blogsService from "./services/blogs";

const App = () => {
  const [msg, setMsg] = useState(null);
  const [user, setUser] = useState(null);

  const handleUserLogin = (loginUser) => {
    blogsService.setToken(loginUser.token);
    setUser(loginUser);
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
  return <Blogs user={user}></Blogs>;
};

export default App;
