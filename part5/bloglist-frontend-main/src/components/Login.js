import { useState } from "react";
import loginService from "../services/login";

const Login = ({ handleUserLogin, setErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("username", username);
    console.log("password", password);
    try {
      const user = await loginService.login({ username, password });
      setUsername("");
      setPassword("");
      handleUserLogin(user);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
