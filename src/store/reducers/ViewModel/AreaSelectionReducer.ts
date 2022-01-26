import { CardMaker, Area } from "../../types";

export type AreaSelectionAction = {
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

export default function areaSelection(cardMaker: CardMaker, action: AreaSelectionAction): Area | null {
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