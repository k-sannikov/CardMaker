import { CardMaker, Filter } from "../../types";

export type FilterAction = {
  type: "INPUT_FILTER",
  color: string,
  opacity: number,
} | {
  type: "UNDO",
} | {
  type: "REDO"
}

export default function filter(cardMaker: CardMaker, action: FilterAction): Filter | null {
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