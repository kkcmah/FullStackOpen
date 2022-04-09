import { useState } from "react";
import { useDispatch } from "react-redux";
import Notification from "./Notification";
import { loginUser } from "../reducers/userReducer";
import { TextField, Button } from "@material-ui/core";

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
          <TextField
            label="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          ></TextField>
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          ></TextField>
        </div>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          id="login-btn"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
