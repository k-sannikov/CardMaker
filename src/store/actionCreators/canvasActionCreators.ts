import { store } from "../store"

export function setCanvasSize(width: number, height: number) {
  return {
    type: "SET_CANVAS_SIZE",
    width: width,
    height: height,
  }
}

export function setFilter(color: string, opacity: number) {
  return {
    type: "SET_FILTER",
    color: color,
    opacity: opacity,
  }
}

export function setBackgroundColor(color: string) {
  return {
    type: "SET_BACKGROUND_COLOR",
    color: color,
  }
}

export function setBackgroundImg(src: string, width: number, height: number) {
  return {
    type: "SET_BACKGROUND_IMG",
    src: src,
    width: width,
    height: height,
  }
}

export function resetBackground() {
  return {
    type: "RESET_BACKGROUND",
  }
}

export function inputBackgroundColor(color: string) {
  return {
    type: "INPUT_BACKGROUND_COLOR",
    color: color,
  }
}

export function inputBackgroundImg(src: string, width: number, height: number) {
  return {
    type: "INPUT_BACKGROUND_IMG",
    src: src,
    width: width,
    height: height,
  }
}

export function inputCanvasSize(width: number, height: number) {
  return {
    type: "INPUT_CANVAS_SIZE",
    width: width,
    height: height,
  }
}

export function inputFilter(color: string, opacity: number) {
  return {
    type: "INPUT_FILTER",
    color: color,
    opacity: opacity,
  }
}

export function areaSelection(x: number, y: number, width: number, height: number) {
  return {
    type: "AREA_SELECTION",
    x: x,
    y: y,
    width: width,
    height: height,
  }
}

export function resetAreaSelection() {
  return {
    type: "RESET_AREA_SELECTION",
  }
}

export function setPositionAreaSelection(x: number, y: number) {
  return {
    type: "SET_POSITION_AREA_SELECTION",
    x: x,
    y: y,
  }
}

export function deleteAreaSelection() {
  return {
    type: "DELETE_AREA_SELECTION",
    area: store.getState().viewModel.areaSelection,
  }
}
