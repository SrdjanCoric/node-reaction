import React from "react";
import ListCard from "./ListCard";

const sortedCards = cards => {
  const copy = cards.slice();
  return copy.sort((a, b) => a.position - b.position);
};

const ListCards = ({ listId, cards }) => {
  console.log("cards", cards);
  return (
    <div id="cards-container" data-id={`list-${listId}-cards`}>
      {sortedCards(cards).map(card => {
        return <ListCard key={card._id} {...card} />;
      })}
    </div>
  );
};

export default ListCards;
