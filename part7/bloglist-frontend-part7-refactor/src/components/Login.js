import { useState } from "react";
import { useDispatch } from "react-redux";
import Notification from "./Notification";
import { loginUser } from "../reducers/userReducer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    setUsername("");
    setPassword("");
    dispatch(loginUser(username, password));
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

        <button type="submit" id="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
