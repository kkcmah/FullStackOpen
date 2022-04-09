import { useSelector } from "react-redux";
import { Alert } from '@material-ui/lab'
import "./Notification.css";

const Notification = () => {
  const { msg, err } = useSelector((state) => state.notification);
  if (!msg) return null;
  if (err) return <Alert severity="error">{msg}</Alert>;
  return <Alert severity="success">{msg}</Alert>;
};

export default Notification;
