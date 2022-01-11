import { Background } from "../types";

export type BackgroundAction = {
  type: "NEW_CARD_MAKER",
} | {
  type: "RESET_BACKGROUND",
} | {
  type: "SET_BACKGROUND_COLOR",
  color: string,
} | {
  type: "SET_BACKGROUND_IMG",
  src: string,
  width: number,
  height: number,
}

function background(background: Background, action: BackgroundAction): Background {
  switch (action.type) {

    case "NEW_CARD_MAKER":
      return {
        color: "#ffffff",
        src: null,
        width: null,
        height: null,
      };

    case "RESET_BACKGROUND":
      return {
        color: "#ffffff",
        src: null,
        width: null,
        height: null,
      };

    case "SET_BACKGROUND_COLOR":
      return {
        color: action.color,
        src: null,
        width: null,
        height: null,
      };

    case "SET_BACKGROUND_IMG":
      return {
        color: null,
        src: action.src,
        width: action.width,
        height: action.height,
      };

    default:
      return background;
  }
}

export default background;