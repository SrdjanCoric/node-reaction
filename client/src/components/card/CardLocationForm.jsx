import React from "react";

const CardLocationForm = props => {
  return (
    <div>
      <div className="button-link setting board">
        <span className="label">Board</span>
        <span className="value js-board-value">{props.selectedBoardTitle}</span>
        <label>Board</label>
        <select onChange={props.onBoardChange} value={props.selectedBoardId}>
          {props.boards.map(board => {
            const selected = board._id === props.currentBoardId;

            return (
              <option value={board._id} key={board._id}>
                {board.title}
                {selected ? " (current)" : ""}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <div className="button-link setting list">
          <span className="label">List</span>
          <span className="value js-list-value">{props.selectedListTitle}</span>
          <label>List</label>
          <select onChange={props.onListChange} value={props.selectedListId}>
            {props.lists.map(list => {
              const selected = list._id === props.currentListId;

              return (
                <option value={list._id} key={list._id}>
                  {list.title}
                  {selected ? " (current)" : ""}
                </option>
              );
            })}
          </select>
        </div>
        <div className="button-link setting position">
          <span className="label">Position</span>
          <span className="value">{props.selectedPositionHumanIndex}</span>
          <label>Position</label>
          <select
            onChange={props.onPositionChange}
            value={props.selectedPosition}
          >
            {props.positions.map((position, index) => {
              const selected =
                props.selectedListId === props.currentListId &&
                props.currentPosition === position;

              return (
                <option value={position} key={position}>
                  {index + 1}
                  {selected ? " (current)" : ""}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CardLocationForm;
