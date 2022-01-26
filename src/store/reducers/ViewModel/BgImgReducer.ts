import { CardMaker, Size } from "../../types";

export type BgImgAction = {
  type: "INPUT_BACKGROUND_IMG",
  width: number,
  height: number,
  src: string,
} | {
  type: "UNDO",
} | {
  type: "REDO"
}

export default function bgImg(cardMaker: CardMaker, action: BgImgAction): Size & { src: string } | null {
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