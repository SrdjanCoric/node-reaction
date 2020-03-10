import React from "react";
import ListWrapper from "../list/ListWrapper";

const ExistingLists = ({ lists }) => {
  return (
    <div id="existing-lists" className="existing-lists">
      {lists.map(list => (
        <ListWrapper key={list.id} {...list} />
      ))}
    </div>
  );
};

export default ExistingLists;
