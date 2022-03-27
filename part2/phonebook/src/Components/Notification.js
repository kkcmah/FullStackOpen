import "./Notification.css";

const Notification = ({msg}) => {
  if (msg === null) return null;
  if (msg.type === "error") return <div className="error">{msg.msg}</div>;
  if (msg.type === "success") return <div className="success">{msg.msg}</div>;
};

export default Notification;
