import {
  CardMaker,
  Canvas,
  Filter,
  Background,
  ActionHistory,
  Block,
} from './CardMakerTypes';

import {
  setComponentFields,
  getIndexById,
  isShiftUpAvailable,
  isShiftDownAvailable,
  isSelectedBlock,
  isUndoAvailable,
  isRedoAvailable
} from './utils/utils'

import { createGUID } from './utils/guid';

export function createCanvas(cardMaker: CardMaker): CardMaker {
  const defaultWidth: number = 800;
  const defaultHeight: number = 600;
  const defaultFilter: Filter = {
    color: '#ffffff',
    opacity: 100,
  }
  const defaultBackground: Background = {
    color: '#ffffff',
    src: null,
  }

  const canvas: Canvas = {
    width: defaultWidth,
    height: defaultHeight,
    filter: defaultFilter,
    listBlock: [],
    background: defaultBackground,
    deleteArea: [],
  };
  return {
    ...cardMaker,
    canvas
  }
}

type setCanvasSizeParam = {
  width: number,
  height: number,
}
export function setCanvasSize(cardMaker: CardMaker, { width, height }: setCanvasSizeParam): CardMaker {
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      width: width,
      height: height,
    }
  };
}

type setFilterParam = {
  color: string,
  opacity: number,
}
export function setFilter(cardMaker: CardMaker, { color, opacity }: setFilterParam): CardMaker {
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      filter: {
        color: color,
        opacity: opacity,
      }
    }
  };
}

export function setSelectedComponent(cardMaker: CardMaker, id: string): CardMaker {
  return {
    ...cardMaker,
    selectBlock: id,
  };
}

export function resetSelectedComponent(cardMaker: CardMaker): CardMaker {
  return {
    ...cardMaker,
    selectBlock: null,
  };
}

export function setBackgroundColor(cardMaker: CardMaker, color: string): CardMaker {
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      background: {
        color: color,
        src: null,
      },
    }
  };
}

export function setBackgroundImg(cardMaker: CardMaker, src: string): CardMaker {
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      background: {
        color: null,
        src: src,
      },
    }
  };
}

export function resetBackground(cardMaker: CardMaker): CardMaker {
  const defaultBackgroundColor = '#ffffff'
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      background: {
        color: defaultBackgroundColor,
        src: null,
      },
    }

  };
}

export function createTextComponent(cardMaker: CardMaker): CardMaker {
  const defaultWidthElement = 150;
  const defaultHeightElement = 50;
  const defaultSizeText = 30;
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: [
        ...cardMaker.canvas.listBlock,
        {
          id: createGUID(),
          type: 'text',
          color: '#000000',
          width: defaultWidthElement,
          height: defaultHeightElement,
          posX: cardMaker.canvas.width / 2,
          posY: cardMaker.canvas.height / 2,
          text: 'Текст',
          size: defaultSizeText,
          bold: false,
          italic: false,
          underline: false,
          fontFamily: 'arial',
        }
      ],
    }
  };
}

type setSizeComponentParam = {
  id: string,
  width: number,
  height: number,
}
export function setSizeComponent(cardMaker: CardMaker, { id, width, height }: setSizeComponentParam): CardMaker {
  let modifiableFields = {
    width: width,
    height: height,
  }
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: setComponentFields(cardMaker.canvas.listBlock, id, modifiableFields)
    }
  };
}

type setTextInTextComponentParam = {
  id: string,
  text: string,
}
export function setTextInTextComponent(cardMaker: CardMaker, { id, text }: setTextInTextComponentParam): CardMaker {
  let modifiableFields = {
    text: text,
  }
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: setComponentFields(cardMaker.canvas.listBlock, id, modifiableFields)
    }
  };
}

type setBoldTextParam = {
  id: string,
  isBold: boolean,
}
export function setBoldText(cardMaker: CardMaker, { id, isBold }: setBoldTextParam): CardMaker {
  let modifiableFields = {
    bold: isBold,
  }
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: setComponentFields(cardMaker.canvas.listBlock, id, modifiableFields)
    }
  };
}

type setItalicTextParam = {
  id: string,
  isItalic: boolean,
}
export function setItalicText(cardMaker: CardMaker, { id, isItalic }: setItalicTextParam): CardMaker {
  let modifiableFields = {
    italic: isItalic,
  }
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: setComponentFields(cardMaker.canvas.listBlock, id, modifiableFields)
    }
  };
}

type setUnderlineTextParam = {
  id: string,
  isUnderline: boolean,
}
export function setUnderlineText(cardMaker: CardMaker, { id, isUnderline }: setUnderlineTextParam): CardMaker {
  let modifiableFields = {
    underline: isUnderline,
  }
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: setComponentFields(cardMaker.canvas.listBlock, id, modifiableFields)
    }
  };
}

type setSizeTextParam = {
  id: string,
  size: number,
}
export function setSizeText(cardMaker: CardMaker, { id, size }: setSizeTextParam): CardMaker {
  let modifiableFields = {
    size: size,
  }
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: setComponentFields(cardMaker.canvas.listBlock, id, modifiableFields)
    }
  };
}

type setColorTextParam = {
  id: string,
  color: string,
}
export function setColorText(cardMaker: CardMaker, { id, color }: setColorTextParam): CardMaker {
  let modifiableFields = {
    color: color,
  }
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: setComponentFields(cardMaker.canvas.listBlock, id, modifiableFields)
    }
  };
}

type createImgComponentParam = {
  src: string,
  width: number,
  height: number
}
export function createImgComponent(cardMaker: CardMaker, { src, width, height }: createImgComponentParam): CardMaker {
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: [
        ...cardMaker.canvas.listBlock,
        {
          id: createGUID(),
          type: 'img',
          width: width,
          height: height,
          posX: cardMaker.canvas.width / 2,
          posY: cardMaker.canvas.height / 2,
          src: src,
        }
      ],
    }
  };
}

export function createArtObjComponent(cardMaker: CardMaker, src: string): CardMaker {
  const defaultWidthElement = 150;
  const defaultHeightElement = 150;

  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: [
        ...cardMaker.canvas.listBlock,
        {
          id: createGUID(),
          type: 'artObj',
          width: defaultWidthElement,
          height: defaultHeightElement,
          posX: cardMaker.canvas.width / 2,
          posY: cardMaker.canvas.height / 2,
          // nameArtObj: name,
          src: src,
        }
      ],
    }
  };
}


export function deleteComponent(cardMaker: CardMaker): CardMaker {
  if (isSelectedBlock(cardMaker)) {
    let copyListBlock: Block[] = [...cardMaker.canvas.listBlock];
    copyListBlock.forEach((component, index) => {
      if (component.id === cardMaker.selectBlock) {
        copyListBlock.splice(index, 1);
        return false;
      }
    });
    return {
      ...cardMaker,
      canvas: {
        ...cardMaker.canvas,
        listBlock: copyListBlock
      }
    };
  } else {
    return cardMaker;
  }
}

type setPositionComponentParam = {
  newX: number,
  newY: number,
}
export function setPositionComponent(cardMaker: CardMaker, { newX, newY }: setPositionComponentParam): CardMaker {
  let modifiableFields = {
    posX: newX,
    posY: newY,
  }
  let canvas: Canvas = cardMaker.canvas;
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: setComponentFields(canvas.listBlock, cardMaker.selectBlock as string, modifiableFields)
    }
  };
}

export function addHistory(cardMaker: CardMaker, newCanvas: Canvas): CardMaker {
  let history: ActionHistory = cardMaker.history;
  let newListState: Canvas[] = [...history.listState];
  if (history.currentIndex !== history.listState.length - 1) {
    newListState.splice(history.currentIndex + 1, history.listState.length - history.currentIndex + 1);
  }
  newListState.push(newCanvas);
  return {
    ...cardMaker,
    history: {
      currentIndex: history.currentIndex + 1,
      listState: newListState,
    }
  }
}

export function undo(cardMaker: CardMaker): CardMaker {
  const currentIndex: number = cardMaker.history.currentIndex;
  const newCurrentIndex: number = isUndoAvailable(cardMaker) ? currentIndex - 1 : currentIndex;
  return {
    ...cardMaker,
    history: {
      ...cardMaker.history,
      currentIndex: newCurrentIndex,
    }
  }
}

export function redo(cardMaker: CardMaker): CardMaker {
  const currentIndex: number = cardMaker.history.currentIndex;
  const newCurrentIndex: number = isRedoAvailable(cardMaker) ? currentIndex + 1 : currentIndex;
  return {
    ...cardMaker,
    history: {
      ...cardMaker.history,
      currentIndex: newCurrentIndex,
    }
  }
}

export function applyTemplate(cardMaker: CardMaker, template: string): CardMaker {
  return {
    ...cardMaker,
    canvas: JSON.parse(template),
  }
}

export function shiftUpBlock(cardMaker: CardMaker): CardMaker {
  if (isShiftUpAvailable(cardMaker)) {
    let newListBlock: Block[] = [...cardMaker.canvas.listBlock];
    const id: string = cardMaker.selectBlock as string;
    const index: number = getIndexById(newListBlock, id);
    const flipValue: Block[] = [newListBlock[index + 1], newListBlock[index]];
    newListBlock.splice(index, 2, ...flipValue);
    return {
      ...cardMaker,
      canvas: {
        ...cardMaker.canvas,
        listBlock: newListBlock,
      }
    }
  } else {
    return cardMaker;
  }
}

export function shiftDownBlock(cardMaker: CardMaker): CardMaker {
  if (isShiftDownAvailable(cardMaker)) {
    let newListBlock: Block[] = [...cardMaker.canvas.listBlock];
    const id: string = cardMaker.selectBlock as string;
    const index: number = getIndexById(newListBlock, id);
    const flipValue: Block[] = [newListBlock[index], newListBlock[index - 1]];
    newListBlock.splice(index - 1, 2, ...flipValue);
    return {
      ...cardMaker,
      canvas: {
        ...cardMaker.canvas,
        listBlock: newListBlock,
      }
    }
  } else {
    return cardMaker;
  }
}

export function applyFileProject(cardMaker: CardMaker, newCanvas: Canvas): CardMaker {
  return {
    ...cardMaker,
    canvas: newCanvas
  };
}