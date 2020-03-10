import { connect } from "react-redux";
import ToggleableAddCard from "./ToggleableAddCard";
import * as actions from "../../actions/ListActions";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddCard: (card, callback) => {
      dispatch(actions.createCard(ownProps.listId, card, callback));
    }
  };
};

export default connect(null, mapDispatchToProps)(ToggleableAddCard);
