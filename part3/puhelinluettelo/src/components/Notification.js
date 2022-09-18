const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    color: message.error ? 'red' : 'green',
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={notificationStyle}>
      {message.message}
    </div>
  );
}

export default Notification;