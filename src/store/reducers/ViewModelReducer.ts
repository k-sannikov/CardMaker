import { CardMaker, Size, Filter, ViewModelText, Block, Text, Area } from "../types";
import { getIndexById } from "../../utils/elementList";

export type ViewModelAction = { type: "NEW_CARD_MAKER" } | BgColorAction | BgImgAction | CanvasSizeAction | FilterAction | TextAction;

function viewModel(cardMaker: CardMaker = {} as CardMaker, action: ViewModelAction) {
  if (action.type === "NEW_CARD_MAKER") {
    return {
      bgColor: null,
      bgImg: null,
      canvasSize: null,
      filter: null,
      text: {
        color: null,
        size: null,
        bold: null,
        italic: null,
        underline: null,
        fontFamily: null,
        tempColor: null,
        tempSize: null,
      },
      areaSelection: null,
    }
  }
  return {
    bgColor: bgColor(cardMaker, action as BgColorAction),
    bgImg: bgImg(cardMaker, action as BgImgAction),
    canvasSize: canvasSize(cardMaker, action as CanvasSizeAction),
    filter: filter(cardMaker, action as FilterAction),
    text: text(cardMaker, action as TextAction),
    areaSelection: areaSelection(cardMaker, action as AreaSelectionAction),
  }
}

type AreaSelectionAction = {
  type: "AREA_SELECTION",
  x: number,
  y: number,
  width: number,
  height: number,
} | {
  type: "RESET_AREA_SELECTION",
} | {
  type: "SET_POSITION_AREA_SELECTION",
  x: number,
  y: number,
} | {
  type: "UNDO",
} | {
  type: "REDO"
}

function areaSelection(cardMaker: CardMaker, action: AreaSelectionAction): Area | null {
  switch (action.type) {
    case "AREA_SELECTION":
      return {
        x: action.x,
        y: action.y,
        width: action.width,
        height: action.height,
      }
    case "SET_POSITION_AREA_SELECTION":
      return {
        ...cardMaker.viewModel.areaSelection as Area,
        x: action.x,
        y: action.y,
      };
    case "RESET_AREA_SELECTION": return null;
    case "UNDO": return null;
    case "REDO": return null;
    default: return cardMaker.viewModel.areaSelection;
  }
}

type BgColorAction = {
  type: "INPUT_BACKGROUND_COLOR",
  color: string,
} | {
  type: "UNDO",
} | {
  type: "REDO"
}

function bgColor(cardMaker: CardMaker, action: BgColorAction): string | null {
  switch (action.type) {
    case "INPUT_BACKGROUND_COLOR": return action.color;
    case "UNDO": return null;
    case "REDO": return null;
    default: return cardMaker.canvas.background.color;
  }
}

type BgImgAction = {
  type: "INPUT_BACKGROUND_IMG",
  width: number,
  height: number,
  src: string,
} | {
  type: "UNDO",
} | {
  type: "REDO"
}

function bgImg(cardMaker: CardMaker, action: BgImgAction): Size & { src: string } | null {
  switch (action.type) {
    case "INPUT_BACKGROUND_IMG":
      return {
        width: action.width,
        height: action.height,
        src: action.src,
      };
    case "UNDO": return null;
    case "REDO": return null;
    default: return null;
  }
}

type CanvasSizeAction = {
  type: "INPUT_CANVAS_SIZE",
  width: number,
  height: number,
} | {
  type: "UNDO",
} | {
  type: "REDO"
}

function canvasSize(cardMaker: CardMaker, action: CanvasSizeAction): Size | null {
  switch (action.type) {
    case "INPUT_CANVAS_SIZE":
      return {
        width: action.width,
        height: action.height,
      };
    case "UNDO": return null;
    case "REDO": return null;
    default:
      return cardMaker.viewModel.canvasSize
  }
}

type FilterAction = {
  type: "INPUT_FILTER",
  color: string,
  opacity: number,
} | {
  type: "UNDO",
} | {
  type: "REDO"
}

function filter(cardMaker: CardMaker, action: FilterAction): Filter | null {
  switch (action.type) {
    case "INPUT_FILTER":
      return {
        color: action.color,
        opacity: action.opacity,
      };
    case "UNDO": return null;
    case "REDO": return null;
    default:
      return cardMaker.viewModel.filter
  }
}

type TextAction = {
  type: "CLICK_ON_TEXT",
  id: string,
} | {
  type: "RESET_SELECTED_BLOCK",
} | {
  type: "SET_SELECTED_BLOCK",
  id: string,
} | {
  type: "SET_FONT_FAMILY_TEXT",
  id: string,
  fontFamily: string,
} | {
  type: "INPUT_COLOR_TEXT",
  color: string,
} | {
  type: "INPUT_SIZE_TEXT",
  size: number,
} | {
  type: "SET_BOLD_TEXT",
  id: string,
  isBold: boolean,
} | {
  type: "SET_ITALIC_TEXT",
  id: string,
  isItalic: boolean,
} | {
  type: "SET_UNDERLINE_TEXT",
  id: string,
  isUnderline: boolean,
} | {
  type: "UNDO",
} | {
  type: "REDO"
}

function text(cardMaker: CardMaker, action: TextAction): ViewModelText {
  const defState: ViewModelText = {
    color: null,
    size: null,
    bold: null,
    italic: null,
    underline: null,
    fontFamily: null,
    tempColor: null,
    tempSize: null,
  }

  let list: Block[]
  switch (action.type) {

    case "CLICK_ON_TEXT":
      list = cardMaker.canvas.listBlock;
      const { color, size, bold, italic, underline, fontFamily } = list[getIndexById(list, action.id)] as Text;
      return { color, tempColor: null, tempSize: null, size, bold, italic, underline, fontFamily }

    case "SET_FONT_FAMILY_TEXT":
      return {
        ...cardMaker.viewModel.text,
        fontFamily: action.fontFamily
      };

    case "INPUT_COLOR_TEXT":
      return {
        ...cardMaker.viewModel.text,
        tempColor: action.color
      };

    case "INPUT_SIZE_TEXT":
      return {
        ...cardMaker.viewModel.text,
        tempSize: action.size
      };

    case "SET_BOLD_TEXT":
      return {
        ...cardMaker.viewModel.text,
        bold: action.isBold
      };

    case "SET_ITALIC_TEXT":
      return {
        ...cardMaker.viewModel.text,
        italic: action.isItalic
      };

    case "SET_UNDERLINE_TEXT":
      return {
        ...cardMaker.viewModel.text,
        underline: action.isUnderline
      };

    case "SET_SELECTED_BLOCK": return defState;
    case "RESET_SELECTED_BLOCK": return defState;

    case "UNDO": return defState;

    case "REDO": return defState;

    default:
      return cardMaker.viewModel.text
  }
}

export default viewModel;