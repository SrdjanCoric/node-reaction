import { connect } from "react-redux";
import Application from "./Application";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, null)(Application);
