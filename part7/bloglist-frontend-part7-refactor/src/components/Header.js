import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { Link } from "react-router-dom";
import { Button, AppBar, Box, Toolbar, IconButton } from "@material-ui/core";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUserLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) return null;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            <div>
              {user.name} logged in{" "}
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleUserLogout}
              >
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <h2>blog app</h2>
      <Notification></Notification>
    </>
  );
};

export default Header;
