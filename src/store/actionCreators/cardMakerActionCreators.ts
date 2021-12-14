import { CardMaker } from '../types';

export function newCardMaker() {
  return {
    type: 'NEW_CARD_MAKER',
  }
}

export function applyFileProject(cardMaker: CardMaker) {
  return {
    type: 'APPLY_FILE_PROJECT',
    project: cardMaker,
  }
}
