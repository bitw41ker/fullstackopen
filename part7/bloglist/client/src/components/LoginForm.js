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
            id="username"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div>
          Password
          <input
            id="password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="login-btn" type="submit">
          Login
        </button>
      </form>
    </>
  );
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};
