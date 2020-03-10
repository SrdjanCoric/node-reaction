export function boardListsSelector(state, boardId) {
  const lists = state.lists;
  return lists.filter(list => list.board === boardId);
}
