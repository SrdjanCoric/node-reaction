export function listCards(state, listId) {
  console.log(state.cards);
  console.log(listId);
  return state.cards.filter(card => card.list === listId);
}
