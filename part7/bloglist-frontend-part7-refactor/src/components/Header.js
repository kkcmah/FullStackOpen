import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUserLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) return null;
  return (
    <>
      <div className="navbar">
        <Link className="link" to="/">
          blogs
        </Link>
        <Link className="link" to="/users">
          users
        </Link>
        {user.name} logged in <button onClick={handleUserLogout}>Logout</button>
      </div>
      <h2>blog app</h2>
      <Notification></Notification>
    </>
  );
};

export default Header;
