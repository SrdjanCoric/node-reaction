export function getBoardById(state, id) {
  return state.boards.find(board => board._id === id);
}
