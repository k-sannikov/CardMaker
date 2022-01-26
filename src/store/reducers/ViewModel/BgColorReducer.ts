import { CardMaker } from "../../types";

export type BgColorAction = {
  type: "INPUT_BACKGROUND_COLOR",
  color: string,
} | {
  type: "UNDO",
} | {
  type: "REDO",
}

export default function bgColor(cardMaker: CardMaker, action: BgColorAction): string | null {
  switch (action.type) {
    case "INPUT_BACKGROUND_COLOR": return action.color;
    case "UNDO": return null;
    case "REDO": return null;
    default: return cardMaker.canvas.background.color;
  }
}