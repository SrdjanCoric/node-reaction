import React from "react";

const SignUp = () => {
  return (
    <div class="login-wrap">
      <h2>Sign Up</h2>

      <div class="form">
        <input type="text" placeholder="Full Name" name="fn" />
        <input type="email" placeholder="Email address" name="em" />
        <input type="text" placeholder="Username" name="un" />
        <input type="password" placeholder="Password" name="pw" />
        <input type="password" placeholder="Repeat Password" name="rpw" />
        <button> Sign up </button>
      </div>
    </div>
  );
};

export default SignUp;
