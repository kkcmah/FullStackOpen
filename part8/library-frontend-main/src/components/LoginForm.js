import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

import { LOGIN } from "../queries";

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  const login = (event) => {
    event.preventDefault();

    loginUser({ variables: { username, password } });

    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={login}>
      <div>
        username:
        <input
          type={"text"}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        password:
        <input
          type={"password"}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
