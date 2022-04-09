import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const Togglable = ({ children, toggleVisibility, visible, buttonLabel }) => {
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="outlined" onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button variant="outlined" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
