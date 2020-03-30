import { connect } from "react-redux";
import Application from "./Application";
import * as userActions from "../actions/UserActions";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authentication.isLoggedIn,
    token: state.authentication.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(userActions.logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
