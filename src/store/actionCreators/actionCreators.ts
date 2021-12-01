import { Canvas, CardMaker } from '../../CardMakerTypes';
import { store } from '../store';

export function newCardMaker() {
  return {
    type: 'NEW_CARD_MAKER',
  }
}

export function setCanvasSize(width: number, height: number) {
  return {
    type: 'SET_CANVAS_SIZE',
    width: width,
    height: height,
  }
}

export function setFilter(color: string, opacity: number) {
  return {
    type: 'SET_FILTER',
    color: color,
    opacity: opacity,
  }
}

export function setSelectedBlock(id: string) {
  return {
    type: 'SET_SELECTED_BLOCK',
    id: id,
  }
}

export function resetSelectedBlock() {
  return {
    type: 'RESET_SELECTED_BLOCK',
  }
}

export function setBackgroundColor(color: string) {
  return {
    type: 'SET_BACKGROUND_COLOR',
    color: color,
  }
}

export function setBackgroundImg(src: string) {
  return {
    type: 'SET_BACKGROUND_IMG',
    src: src,
  }
}

export function resetBackground() {
  return {
    type: 'RESET_BACKGROUND',
  }
}

export function createTextBlock() {
  return {
    type: 'CREATE_TEXT_BLOCK',
  }
}

export function setSizeBlock(width: number, height: number) {
  return {
    type: 'SET_SIZE_BLOCK',
    id: store.getState().selectBlock,
    width: width,
    height: height,
  }
}

export function setTextInTextBlock(text: string) {
  return {
    type: 'SET_TEXT_IN_TEXT_BLOCK',
    id: store.getState().selectBlock,
    text: text,
  }
}

export function setBoldText(id: string, isBold: boolean) {
  return {
    type: 'SET_BOLD_TEXT',
    id: store.getState().selectBlock,
    isBold: isBold,
  }
}

export function setItalicText(isItalic: boolean) {
  return {
    type: 'SET_ITALIC_TEXT',
    id: store.getState().selectBlock,
    isItalic: isItalic,
  }
}

export function setUnderlineText(isUnderline: boolean) {
  return {
    type: 'SET_UNDERLINE_TEXT',
    id: store.getState().selectBlock,
    underline: isUnderline,
  }
}

export function setSizeText(size: number) {
  return {
    type: 'SET_SIZE_TEXT',
    id: store.getState().selectBlock,
    size: size,
  }
}

export function setColorText(color: string) {
  return {
    type: 'SET_COLOR_TEXT',
    id: store.getState().selectBlock,
    color: color,
  }
}

export function createImgBlock(src: string, width: number, height: number) {
  return {
    type: 'CREATE_IMG_BLOCK',
    src: src,
    width: width,
    height: height,
  }
}

export function createArtObjBlock(src: string) {
  return {
    type: 'CREATE_ART_OBJ_BLOCK',
    src: src,
  }
}

export function deleteBlock() {
  return {
    type: 'DELETE_BLOCK',
    id: store.getState().selectBlock,
  }
}



export function setPositionBlock(x: number, y: number) {
  return {
    type: 'SET_POSITION_BLOCK',
    id: store.getState().selectBlock,
    x: x,
    y: y,
  }
}

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

export function shiftUpBlock() {
  return {
    type: 'SHIFT_UP_BLOCK',
    id: store.getState().selectBlock,
  }
}

export function shiftDownBlock() {
  return {
    type: 'SHIFT_DOWN_BLOCK',
    id: store.getState().selectBlock,
  }
}

export function applyFileProject(newCanvas: Canvas) {
  return {
    type: 'APPLY_FILE_PROJECT',
    newCanvas: newCanvas,
  }
}