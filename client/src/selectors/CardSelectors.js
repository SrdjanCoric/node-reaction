export function listCards(state, listId) {
  return state.cards.filter(card => card.listId === listId);
}
