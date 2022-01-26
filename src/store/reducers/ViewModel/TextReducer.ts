import { CardMaker, ViewModelText, Block, Text } from "../../types";
import { getIndexById } from "../../../utils/elementList";

export type TextAction = {
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
} | {
  type: "DELETE_BLOCK"
}

export default function text(cardMaker: CardMaker, action: TextAction): ViewModelText {
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
    
    case "DELETE_BLOCK": return defState;

    default:
      return cardMaker.viewModel.text
  }
}