import React from "react";
import * as actions from "../../actions/CardActions";
import { connect } from "react-redux";
import CardModal from "./CardModal";

const mapStateToProps = (state, ownProps) => {
  const cardId = ownProps.match.params.id;
  const card = state.cards.find(card => card._id === cardId);
  const list = state.lists.find(list => list._id === card.listId);
  return {
    card,
    list
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFetchCard: () => dispatch(actions.fetchCard(ownProps.match.params.id))
  };
};

class CardModalContainer extends React.Component {
  componentDidMount() {
    this.props.onFetchCard();
  }

  render() {
    if (this.props.card) {
      return <CardModal card={this.props.card} list={this.props.list} />;
    } else {
      return null;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardModalContainer);
