import { connect } from "react-redux";
import ToggleableAddCard from "./ToggleableAddCard";
import * as actions from "../../actions/CardActions";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddCard: (title, callback) => {
      dispatch(actions.createCard(ownProps.listId, title, callback));
    }
  };
};

export default connect(null, mapDispatchToProps)(ToggleableAddCard);
