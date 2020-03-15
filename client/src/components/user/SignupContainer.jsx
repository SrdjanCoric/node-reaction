import { connect } from "react-redux";
import Signup from "./Signup";
import * as actions from "../../actions/UserActions";

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (user, callback) => {
      dispatch(actions.signup(user, callback));
    }
  };
};

export default connect(null, mapDispatchToProps)(Signup);
