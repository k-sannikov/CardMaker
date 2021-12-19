import { store } from '../store';

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

export function setSizeBlock(width: number, height: number) {
  return {
    type: 'SET_SIZE_BLOCK',
    id: store.getState().selectBlock,
    width: width,
    height: height,
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

export function clickOnText() {
  return {
    type: 'CLICK_ON_TEXT',
    id: store.getState().selectBlock,
  }
}

export function blurOnText() {
  return {
    type: 'BLUR_ON_TEXT',
  }
}
