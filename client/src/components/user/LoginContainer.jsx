import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import BoardsDashboardContainer from "../dashboard/BoardsDashboardContainer";
import * as actions from "../../actions/UserActions";

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (user, callback) => {
      dispatch(actions.login(user, callback));
    },
    onFetchUser: token => {
      dispatch(actions.fetchUser(token));
    },
    onInvalidUser: () => {
      dispatch(actions.noUser());
    }
  };
};

class LoginContainer extends React.Component {
  componentDidMount() {
    let token = sessionStorage.getItem("jwtToken");
    if (!token || token === "") {
      this.props.onInvalidUser();
      return;
    }
    this.props.onFetchUser(token);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.userisLoggedIn !== this.props.user.isLoggedIn &&
      !this.props.user.isLoggedIn
    ) {
      let token = sessionStorage.getItem("jwtToken");
      this.props.onFetchUser(token);
    }
  }
  render() {
    if (this.props.user.invalidUser) {
      return <Login onLogin={this.props.onLogin} />;
    } else if (this.props.user.isLoggedIn) {
      return <BoardsDashboardContainer />;
    } else {
      return null;
    }
    // if (this.props.user.isLoggedIn) {
    //   return <BoardsDashboardContainer />;
    // } else if (this.props.loading) {
    //   console.log("in loading");
    //   return null;
    // } else {
    //   console.log("should be here");
    //   return <Login onLogin={this.props.onLogin} />;
    // }
  }
}

export default connect(null, mapDispatchToProps)(LoginContainer);
