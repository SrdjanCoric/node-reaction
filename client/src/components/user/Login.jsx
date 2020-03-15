import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div class="login-wrap">
      <h2>Login</h2>

      <div class="form">
        <input type="text" placeholder="Username" name="un" />
        <input type="password" placeholder="Password" name="pw" />
        <button> Sign in </button>
        <Link to={"/signUp"}>
          {" "}
          <p> Don't have an account? Register </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
