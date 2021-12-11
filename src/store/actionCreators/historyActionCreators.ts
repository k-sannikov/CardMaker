import { Canvas, CardMaker } from '../types';

export function addHistory(newCanvas: Canvas) {
  return {
    type: 'ADD_HISTORY',
    newCanvas: newCanvas,
  }
}

export function undo() {
  return {
    type: 'UNDO',
  }
}

export function redo() {
  return {
    type: 'REDO',
  }
}

export function afterChangeHistory(cardMaker: CardMaker) {
  return {
    type: 'AFTER_CHANGE_HISTORY',
    cardMaker: cardMaker,
  }
}