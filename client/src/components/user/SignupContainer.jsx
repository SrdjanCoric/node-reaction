import { connect } from "react-redux";
import Signup from "./Signup";
import * as actions from "../../actions/UserActions";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authentication.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (user, callback) => {
      dispatch(actions.signup(user, callback));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
