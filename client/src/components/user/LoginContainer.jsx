import React from "react";
import { connect } from "react-redux";
import Login from "./Login";

import * as actions from "../../actions/UserActions";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authentication.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (user, callback) => {
      dispatch(actions.login(user, callback));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
