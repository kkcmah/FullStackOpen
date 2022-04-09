import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUserLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) return null;
  return (
    <>
      <h2>blogs</h2>
      <Notification></Notification>
      <p>
        {user.name} logged in <button onClick={handleUserLogout}>Logout</button>
      </p>
    </>
  );
};

export default Header;
