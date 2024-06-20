const Notification = ({ text, state }) => {
  if (text === null) {
    return null;
  }

  return <div className={`notification ${state}`}>{text}</div>;
};

export default Notification;
