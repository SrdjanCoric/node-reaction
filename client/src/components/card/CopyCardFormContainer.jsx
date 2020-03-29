import React from "react";
import { connect } from "react-redux";
import CopyCardForm from "./CopyCardForm";
import calculatePosition from "../../lib/PositionCalculator";
import * as actions from "../../actions/CardActions";
import * as commentSelectors from "../../selectors/CommentSelectors";
import * as cardSelectors from "../../selectors/CardSelectors";

const mapStateToProps = (state, ownProps) => {
  return {
    comments: commentSelectors.cardComments(state, ownProps.card._id),
    state: state
  };
};

const mapDispatchToProps = dispatch => {
  let token = localStorage.getItem("jwtToken");
  return {
    onCreateCard: (listId, card, callback) => {
      dispatch(actions.createCard(token, listId, card, callback));
    }
  };
};

class CopyCardFormContainer extends React.Component {
  state = {
    location: {
      boardId: undefined,
      listId: undefined,
      position: undefined
    },
    title: "",
    keepComments: true
  };

  componentDidMount() {
    this.setState({ title: this.props.card.title });
  }

  handleLocationChange = location => {
    this.setState({ location }, () => {});
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleKeepCommentsChange = e => {
    this.setState({ keepComments: e.target.checked });
  };

  handleSubmit = e => {
    if (this.isSubmitDisabled()) {
      return;
    }

    e.preventDefault();

    const { listId, position } = this.state.location;
    const listCards = cardSelectors.listCards(
      this.props.state,
      listId,
      (a, b) => {
        return a.position - b.position;
      }
    );
    this.props.onCreateCard(
      this.state.location.listId,
      {
        title: this.state.title,
        position: calculatePosition(listCards, position),
        copyFrom: this.props.card._id,
        keep: {
          comments: this.state.keepComments
        }
      },
      () => {
        this.props.onClose(new Event("click"));
      }
    );
  };

  isSubmitDisabled = () => {
    const { boardId, listId } = this.state.location;

    return boardId == null || listId == null;
  };

  render() {
    return (
      <CopyCardForm
        card={this.props.card}
        commentsCount={this.props.comments.length}
        keepComments={this.state.keepComments}
        onCloseClick={this.props.onClose}
        onLocationChange={this.handleLocationChange}
        onTitleChange={this.handleTitleChange}
        onKeepCommentsChange={this.handleKeepCommentsChange}
        onSubmit={this.handleSubmit}
        isSubmitDisabled={this.isSubmitDisabled()}
        title={this.state.title}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CopyCardFormContainer);
