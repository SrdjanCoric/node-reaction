import { connect } from "react-redux";

import * as actions from "../../actions/ListActions";
import * as listSelectors from "../../selectors/ListSelectors";
import calculatePosition from "../../lib/PositionCalculator";

import ListWrapper from "./ListWrapper";

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    onDrop: function handleDrop(e) {
      const droppedEl = e.target;
      const listId = droppedEl.dataset.listId;
      const siblings = Array.prototype.slice.call(
        droppedEl.parentNode.childNodes
      );
      const lists = listSelectors.boardListsSelector(
        stateProps.state,
        ownProps.boardId
      );
      const targetIndex = siblings.indexOf(droppedEl);
      const sortedStartingList = lists
        .slice()
        .sort((a, b) => a.position - b.position);
      const droppedList = sortedStartingList.find(list => list.id === listId);
      const sourceIndex = sortedStartingList.indexOf(droppedList);
      const newPosition = calculatePosition(lists, targetIndex, sourceIndex);
      dispatchProps.dispatch(
        actions.updateList(stateProps.state.user.token, ownProps._id, {
          position: newPosition
        })
      );
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ListWrapper);
