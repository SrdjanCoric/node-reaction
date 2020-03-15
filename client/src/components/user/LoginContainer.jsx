import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import BoardsDashboardContainer from "../dashboard/BoardsDashboardContainer";
import * as actions from "../../actions/UserActions";

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (user, callback) => {
      dispatch(actions.login(user, callback));
    }
  };
};

const LoginContainer = props => {
  const mainPageComponent = props.user.isLoggedIn ? (
    <BoardsDashboardContainer />
  ) : (
    <Login onLogin={props.onLogin} />
  );
  return mainPageComponent;
};

export default connect(null, mapDispatchToProps)(LoginContainer);
