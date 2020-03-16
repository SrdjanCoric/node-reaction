import { connect } from "react-redux";
import ExistingLists from "./ExistingLists";
import * as listSelectors from "../../selectors/ListSelectors";
import * as actions from "../../actions/CardActions";

const mapStateToProps = (state, ownProps) => {
  const boardId = ownProps.boardId;
  return {
    lists: listSelectors.boardListsSelector(state, boardId),
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateCard: (token, cardId, updatedCard, callback) => {
      dispatch(actions.updateCard(token, cardId, updatedCard, callback));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExistingLists);
