import { useState } from "react";
import { useDispatch } from "react-redux";
import loginService from "../services/login";
import Notification from "./Notification";
import { setNotification } from "../reducers/notificationReducer";

const Login = ({ handleUserLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUsername("");
      setPassword("");
      handleUserLogin(user);
    } catch (error) {
      dispatch(setNotification("wrong username or password", true, 5));
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification></Notification>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          ></input>
        </div>

        <button type="submit" id="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
