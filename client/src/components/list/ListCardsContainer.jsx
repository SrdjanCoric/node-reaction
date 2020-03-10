import { connect } from "react-redux";
import ListCards from "./ListCards";
import * as cardSelectors from "../../selectors/CardSelectors";

const mapStateToProps = (state, ownProps) => {
  return {
    cards: cardSelectors.listCards(state, ownProps.listId)
  };
};

export default connect(mapStateToProps, null)(ListCards);
