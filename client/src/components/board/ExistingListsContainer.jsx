import { connect } from "react-redux";
import ExistingLists from "./ExistingLists";
import * as listSelectors from "../../selectors/ListSelectors";

const mapStateToProps = (state, ownProps) => {
  const boardId = ownProps.boardId;
  return {
    lists: listSelectors.boardListsSelector(state, boardId)
  };
};

export default connect(
  mapStateToProps,
  null
)(ExistingLists);
