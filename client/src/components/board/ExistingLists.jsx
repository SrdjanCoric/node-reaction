import React from "react";
import ReactDOM from "react-dom";
import dragula from "react-dragula";
import ListWrapperContainer from "../list/ListWrapperContainer";
import * as cardSelectors from "../../selectors/CardSelectors";
import calculatePosition from "../../lib/PositionCalculator";

class ExistingLists extends React.Component {
  state = {
    addCardActiveListId: null
  };

  handleAddCardClick = id => {
    this.setState({
      addCardActiveListId: id
    });
  };

  handleAddCardClose = () => {
    this.setState({
      addCardActiveListId: null
    });
  };

  componentDidMount() {
    this.cardDrake = dragula({
      isContainer: function(el) {
        return el.id === "cards-container";
      }
    });

    this.cardDrake.on("drop", el => {
      const droppedEl = el;
      const cardId = el.dataset.cardId;
      const list = el.closest(".list-wrapper");
      const listId = list.dataset.listId;
      const siblings = Array.prototype.slice.call(
        droppedEl.parentNode.childNodes
      );
      const cards = cardSelectors.listCards(this.props.state, listId);
      const targetIndex = siblings.indexOf(droppedEl);
      const sortedStartingCards = cards
        .slice()
        .sort((a, b) => a.position - b.position);
      let sourceIndex = sortedStartingCards.findIndex(
        card => card._id === cardId
      );
      if (sourceIndex === -1) sourceIndex = null;

      const newPosition = calculatePosition(cards, targetIndex, sourceIndex);

      el.setAttribute("style", `${el.style.cssText};display: none;`);

      this.cardDrake.cancel(true);

      this.props.onUpdateCard(
        this.props.state.user.token,
        cardId,
        {
          position: newPosition,
          listId
        },
        () => {
          el.setAttribute(
            "style",
            el.style.cssText.replace("display: none;", "")
          );
        }
      );
    });
  }
  componentWillUnmount() {
    this.cardDrake.destroy();
  }

  dragulaDecorator = componentBackingInstance => {
    if (componentBackingInstance) {
      let options = {
        direction: "horizontal",
        moves: function(el, source, handle, sibling) {
          return !handle.closest("#cards-container");
        },
        accepts: function(el, target, source, sibling) {
          return !el.closest("#cards-container");
        }
      };

      dragula([componentBackingInstance], options).on("drop", function(el) {
        el.dispatchEvent(new Event("drop", { bubbles: true }));
      });
    }
  };

  sortedLists = () => {
    const listCopy = this.props.lists.slice();
    return listCopy.sort((a, b) => a.position - b.position);
  };

  render() {
    return (
      <div
        id="existing-lists"
        className="existing-lists"
        ref={this.dragulaDecorator}
      >
        {this.sortedLists().map(list => (
          <ListWrapperContainer
            key={list._id}
            {...list}
            addCardActive={this.state.addCardActiveListId === list._id}
            onAddCardClick={this.handleAddCardClick}
            onAddCardClose={this.handleAddCardClose}
          />
        ))}
      </div>
    );
  }
}

export default ExistingLists;
