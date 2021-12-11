import { CardMaker, Size, Filter } from "../../CardMakerTypes";

function viewModel(cardMaker: CardMaker = {} as CardMaker, action: any) {
  return {
    bgColor: bgColor(cardMaker, action),
    canvasSize: canvasSize(cardMaker, action),
    filter: filter(cardMaker, action),
  }
}

function bgColor(cardMaker: CardMaker, action: any): string | null {
  switch (action.type) {
    case 'INPUT_BACKGROUND_COLOR': return action.color;
    case 'UNDO': return null;
    case 'REDO': return null;
    default: return cardMaker.canvas.background.color;
  }
}

function canvasSize(cardMaker: CardMaker, action: any): Size | null {
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

function filter(cardMaker: CardMaker, action: any): Filter | null {
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