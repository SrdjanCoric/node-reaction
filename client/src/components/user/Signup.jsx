import React from "react";
import { Redirect } from "react-router-dom";

class Signup extends React.Component {
  state = {
    password: "",
    fullName: "",
    email: ""
  };

  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  };
  handleSignup = () => {
    this.props.onSignup({
      username: this.state.username,
      password: this.state.password,
      fullName: this.state.fullName,
      email: this.state.email
    });
  };
  render() {
    if (this.props.user.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-wrap">
        <h2>Sign Up</h2>

        <div className="form">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={this.state.fullName}
            onChange={this.handleInputChange}
          />
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSignup}>Sign up</button>
        </div>
      </div>
    );
  }
}

export default Signup;
