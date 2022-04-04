import "./Notification.css";

const Notification = ({ isErr, msg }) => {
  if (!msg) return null;
  return <div className={isErr ? "error" : "success"}>{msg}</div>;
};

export default Notification;
