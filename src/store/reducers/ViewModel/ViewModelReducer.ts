import { CardMaker } from "../../types";
import areaSelection, { AreaSelectionAction } from "./AreaSelectionReducer";
import bgColor, { BgColorAction } from "./BgColorReducer";
import bgImg, { BgImgAction } from "./BgImgReducer";
import canvasSize, { CanvasSizeAction } from "./CanvasSizeReducer";
import filter from "./FilterReducer";
import { FilterAction } from "./FilterReducer";
import text, { TextAction } from "./TextReducer";

export type ViewModelAction = { type: "NEW_CARD_MAKER" } | BgColorAction | BgImgAction | CanvasSizeAction | FilterAction | TextAction;

export default function viewModel(cardMaker: CardMaker = {} as CardMaker, action: ViewModelAction) {
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
