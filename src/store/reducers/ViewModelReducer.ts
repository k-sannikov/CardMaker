import { CardMaker, Size, Filter } from "../types";

export type ViewModelAction = BgColorAction & CanvasSizeAction;

function viewModel(cardMaker: CardMaker = {} as CardMaker, action: ViewModelAction) {
  return {
    bgColor: bgColor(cardMaker, action),
    canvasSize: canvasSize(cardMaker, action),
    filter: filter(cardMaker, action),
  }
}

type BgColorAction = {
  type: 'INPUT_BACKGROUND_COLOR',
  color: string,
} | {
  type: 'UNDO',
} | {
  type: 'REDO'
}

function bgColor(cardMaker: CardMaker, action: BgColorAction): string | null {
  switch (action.type) {
    case 'INPUT_BACKGROUND_COLOR': return action.color;
    case 'UNDO': return null;
    case 'REDO': return null;
    default: return cardMaker.canvas.background.color;
  }
}

type CanvasSizeAction = {
  type: 'INPUT_CANVAS_SIZE',
  width: number,
  height: number,
} | {
  type: 'UNDO',
} | {
  type: 'REDO'
}

function canvasSize(cardMaker: CardMaker, action: CanvasSizeAction): Size | null {
  switch (action.type) {
    case 'INPUT_CANVAS_SIZE':
      return {
        width: action.width,
        height: action.height,
      };
    case 'UNDO': return null;
    case 'REDO': return null;
    default:
      return cardMaker.viewModel.canvasSize
  }
}

type FilterAction = {
  type: 'INPUT_FILTER',
  color: string,
  opacity: number,
} | {
  type: 'UNDO',
} | {
  type: 'REDO'
}

function filter(cardMaker: CardMaker, action: FilterAction): Filter | null {
  switch (action.type) {
    case 'INPUT_FILTER':
      return {
        color: action.color,
        opacity: action.opacity,
      };
    case 'UNDO': return null;
    case 'REDO': return null;
    default:
      return cardMaker.viewModel.filter
  }
}

export default viewModel;