import React from "react";
import ListCard from "./ListCard";

const sortedCards = cards => {
  const copy = cards.slice();
  return copy.sort((a, b) => a.position - b.position);
};
// data-id={`list-${listId}-cards`} from cards-container
const ListCards = ({ listId, cards }) => {
  return (
    <div id="cards-container">
      {sortedCards(cards).map(card => {
        return <ListCard key={card._id} {...card} />;
      })}
    </div>
  );
};

export default ListCards;
