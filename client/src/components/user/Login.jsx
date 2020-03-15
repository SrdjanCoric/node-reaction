import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: { email: "", password: "" }
  };

  handleToggleErrors = callback => {
    if (!this.state.email) {
      this.setState(
        state => {
          return { errors: { ...state.errors, email: "Email can't be empty" } };
        },
        () => callback()
      );
    } else {
      this.setState(
        state => {
          return { errors: { ...state.errors, email: "" } };
        },
        () => callback()
      );
    }
    if (!this.state.password) {
      this.setState(
        state => {
          return {
            errors: { ...state.errors, password: "Password can't be empty" }
          };
        },
        () => callback()
      );
    } else {
      this.setState(
        state => {
          return { errors: { ...state.errors, password: "" } };
        },
        () => callback()
      );
    }
  };

  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    this.handleToggleErrors(() => {
      if (!this.state.errors.email && !this.state.errors.password) {
        this.props.onLogin({
          email: this.state.email,
          password: this.state.password
        });
      }
    });
  };

  render() {
    return (
      <div className="login-wrap">
        <h2>Login</h2>

        <div className="form">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          {this.state.errors.email ? (
            <div className="input-feedback">Email can't be empty</div>
          ) : null}

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          {this.state.errors.password ? (
            <div className="input-feedback">Password can't be empty</div>
          ) : null}
          <button onClick={this.handleLogin}> Sign in </button>
          <Link to={"/signUp"}>
            {" "}
            <p> Don't have an account? Register </p>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
