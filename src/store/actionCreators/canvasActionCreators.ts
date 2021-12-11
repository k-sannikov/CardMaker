export function setCanvasSize(width: number, height: number) {
  return {
    type: 'SET_CANVAS_SIZE',
    width: width,
    height: height,
  }
}

export function setFilter(color: string, opacity: number) {
  return {
    type: 'SET_FILTER',
    color: color,
    opacity: opacity,
  }
}

export function setBackgroundColor(color: string) {
  return {
    type: 'SET_BACKGROUND_COLOR',
    color: color,
  }
}

export function setBackgroundImg(src: string) {
  return {
    type: 'SET_BACKGROUND_IMG',
    src: src,
  }
}

export function resetBackground() {
  return {
    type: 'RESET_BACKGROUND',
  }
}

export function inputBackgroundColor(color: string) {
  return {
    type: 'INPUT_BACKGROUND_COLOR',
    color: color,
  }
}

export function inputCanvasSize(width: number, height: number) {
  return {
    type: 'INPUT_CANVAS_SIZE',
    width: width,
    height: height,
  }
}

export function inputFilter(color: string, opacity: number) {
  return {
    type: 'INPUT_FILTER',
    color: color,
    opacity: opacity,
  }
}
