import { connect } from "react-redux";
import ToggleableAddCard from "./ToggleableAddCard";
import * as actions from "../../actions/CardActions";
import calculatePosition from "../../lib/PositionCalculator";

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

const mergeStateToProps = (stateProps, dispatchProps, ownProps) => {
  let cardsFromList = stateProps.state.cards.filter(
    card => card.listId === ownProps.listId
  );
  let targetPosition = cardsFromList.length;
  let position = calculatePosition(cardsFromList, targetPosition);
  return {
    onAddCard: (title, callback) => {
      dispatchProps.dispatch(
        actions.createCard(ownProps.listId, title, position, callback)
      );
    },
    ...ownProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeStateToProps
)(ToggleableAddCard);
