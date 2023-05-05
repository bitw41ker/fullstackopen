import PropTypes from 'prop-types';
import React from 'react';

export default function LoginForm({ handleLogin, setUsername, setPassword }) {
  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div>
          Password
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};
