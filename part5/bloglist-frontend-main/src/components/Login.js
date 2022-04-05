import { useState } from "react";
import loginService from "../services/login";
import Notification from "./Notification";

const Login = ({ handleUserLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUsername("");
      setPassword("");
      handleUserLogin(user);
    } catch (error) {
      setErr(true);
      setMsg("wrong username or password");
      setTimeout(() => {
        setMsg(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification msg={msg} isErr={err}></Notification>
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
