import { CardMaker, Size } from "../../types";

export type CanvasSizeAction = {
  type: "INPUT_CANVAS_SIZE",
  width: number,
  height: number,
} | {
  type: "UNDO",
} | {
  type: "REDO"
} | {
  type: "SET_CANVAS_SIZE"
}

export default function canvasSize(cardMaker: CardMaker, action: CanvasSizeAction): Size | null {
  switch (action.type) {
    case "INPUT_CANVAS_SIZE":
      return {
        width: action.width,
        height: action.height,
      };
    case "SET_CANVAS_SIZE": return null;
    case "UNDO": return null;
    case "REDO": return null;
    default:
      return null;
  }
}