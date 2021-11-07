import {
  CardMaker,
  Canvas,
  Filter,
  Background,
  SetOfArtObject,
  ActionHistory,
  Block,
} from './CardMakerTypes';
import { setComponentFields } from './utils/setComponentFields'
import { getIndexById } from './utils/getIndexById'

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

export function setSelectedComponent(cardMaker: CardMaker, id: number): CardMaker {
  return {
    ...cardMaker,
    selectComponent: id,
  };
}

export function resetSelectedComponent(cardMaker: CardMaker): CardMaker {
  return {
    ...cardMaker,
    selectComponent: null,
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

export function createTextComponent(cardMaker: CardMaker, newId: number): CardMaker {
  const defaultWidthElement = 150;
  const defaultHeightElement = 50;
  const defaultSizeText = 14;
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: [
        ...cardMaker.canvas.listBlock,
        {
          id: newId,
          type: 'text',
          color: '#000000',
          width: defaultWidthElement,
          height: defaultHeightElement,
          posX: cardMaker.canvas.width / 2,
          posY: cardMaker.canvas.height / 2,
          text: '',
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
  id: number,
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
  id: number,
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
  id: number,
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
  id: number,
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
  id: number,
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
  id: number,
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
  id: number,
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
  newId: number,
  src: string,
  width: number,
  height: number
}
export function createImgComponent(cardMaker: CardMaker, { newId, src, width, height }: createImgComponentParam): CardMaker {
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: [
        ...cardMaker.canvas.listBlock,
        {
          id: newId,
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

type createArtObjComponentParam = {
  newId: number,
  name: string,
}
export function createArtObjComponent(cardMaker: CardMaker, { newId, name }: createArtObjComponentParam): CardMaker {
  const defaultWidthElement = 150;
  const defaultHeightElement = 150;

  let pathSelectedType: string = SetOfArtObject.boy;
  switch (name) {
    case 'boy':
      pathSelectedType = SetOfArtObject.boy;
      break;
    case 'frog':
      pathSelectedType = SetOfArtObject.frog;
      break;
    case 'girl':
      pathSelectedType = SetOfArtObject.girl;
      break;
    case 'loupe':
      pathSelectedType = SetOfArtObject.loupe;
      break;
    case 'palette':
      pathSelectedType = SetOfArtObject.palette
      break;
    case 'pencil':
      pathSelectedType = SetOfArtObject.pencil
      break;
    case 'rainbow':
      pathSelectedType = SetOfArtObject.rainbow
      break;
    case 'snail':
      pathSelectedType = SetOfArtObject.snail
      break;
  }

  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: [
        ...cardMaker.canvas.listBlock,
        {
          id: newId,
          type: 'ArtObj',
          width: defaultWidthElement,
          height: defaultHeightElement,
          posX: cardMaker.canvas.width / 2,
          posY: cardMaker.canvas.height / 2,
          nameArtObj: name,
          src: pathSelectedType,
        }
      ],
    }
  };
}


export function deleteComponent(cardMaker: CardMaker): CardMaker {
  let copyListBlock: Block[] = [...cardMaker.canvas.listBlock];

  copyListBlock.forEach(function (component, index) {
    if (component.id === cardMaker.selectComponent) {
      copyListBlock.splice(index, 1);
    }
  });
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: copyListBlock
    }
  };
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
      listBlock: setComponentFields(canvas.listBlock, cardMaker.selectComponent as number, modifiableFields)
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
  return {
    ...cardMaker,
    history: {
      ...cardMaker.history,
      currentIndex: cardMaker.history.currentIndex - 1,
    }
  }
}

export function redo(cardMaker: CardMaker): CardMaker {
  return {
    ...cardMaker,
    history: {
      ...cardMaker.history,
      currentIndex: cardMaker.history.currentIndex + 1,
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
  let newListBlock: Block[] = [...cardMaker.canvas.listBlock];
  const id: number = cardMaker.selectComponent as number;
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
}

export function shiftDownBlock(cardMaker: CardMaker): CardMaker {
  let newListBlock: Block[] = [...cardMaker.canvas.listBlock];
  const id: number = cardMaker.selectComponent as number;
  const index: number = getIndexById(newListBlock, id);
  const flipValue: Block[] = [newListBlock[index], newListBlock[index - 1]];
  newListBlock.splice(index - 1 , 2, ...flipValue);
  return {
    ...cardMaker,
    canvas: {
      ...cardMaker.canvas,
      listBlock: newListBlock,
    }
  }
}