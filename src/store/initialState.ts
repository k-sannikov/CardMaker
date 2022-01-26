import {
  ActionHistory,
  Background,
  Filter,
  Canvas,
  CardMaker,
  ViewModel,
} from "./types";

const testBackground: Background = {
  color: "#ffffff",
  src: null,
  width: null,
  height: null,
}

const testFilter: Filter = {
  color: "#ffffff",
  opacity: 0,
}

const testCanvas: Canvas = {
  width: 800,
  height: 600,
  filter: testFilter,
  listBlock: [],
  deleteArea: [],
  background: testBackground,
}

const testActionHistory: ActionHistory = {
  listState:
    [
      testCanvas,
    ],
  currentIndex: 0,
}

const viewModel: ViewModel = {
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

export const testCardMaker: CardMaker = {
  canvas: testCanvas,
  selectBlock: null,
  history: testActionHistory,
  viewModel: viewModel,
}