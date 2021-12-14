import { store } from '../store';

export function createTextBlock() {
  return {
    type: 'CREATE_TEXT_BLOCK',
    x: store.getState().canvas.width / 2,
    y: store.getState().canvas.height / 2,
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