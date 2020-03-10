import React from "react";
import ListCard from "./ListCard";

const ListCards = ({ listId, cards }) => {
  return (
    <div id="cards-container" data-id={`list-${listId}-cards`}>
      {cards.map(card => {
        return <ListCard key={card.id} {...card} />;
      })}
    </div>
  );
};

export default ListCards;
