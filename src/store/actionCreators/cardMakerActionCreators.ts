import { Canvas } from '../types';

export function newCardMaker() {
  return {
    type: 'NEW_CARD_MAKER',
  }
}

export function applyFileProject(newCanvas: Canvas) {
  return {
    type: 'APPLY_FILE_PROJECT',
    newCanvas: newCanvas,
  }
}
