import { useSelector } from "react-redux";

import "./Notification.css";

const Notification = () => {
  const { msg, err } = useSelector((state) => state.notification);
  if (!msg) return null;
  return <div className={err ? "error" : "success"}>{msg}</div>;
};

export default Notification;
