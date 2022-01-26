import { Size } from "../store/types";

// пропорциональный перерасчет ширины отностиельно новой высоты
export function calcWidthByHeight(initWidth: number, initHeight: number, baseHeight: number): number {
  return initWidth * baseHeight / initHeight
}

// пропорциональный перерасчет высоты отностиельно новой ширины
export function calcHeightByWidth(initWidth: number, initHeight: number, baseWidth: number): number {
  return initHeight * baseWidth / initWidth
}

// пропорциональный перерасчет размеров относительно новой ширины
export function calcSizeByWidth(initWidth: number, initHeight: number, baseWidth: number): Size {
  const newHeight: number = (initHeight * baseWidth) / initWidth;
  const newWidth: number = (initWidth * newHeight) / initHeight;
  return {
    width: newWidth,
    height: newHeight,
  }
}

// пропорциональный перерасчет размеров относительно новой высоты
export function calcSizeByHeight(initWidth: number, initHeight: number, baseHeight: number): Size {
  const newWidth: number = calcWidthByHeight(initWidth, initHeight, baseHeight);
  const newHeight: number = calcHeightByWidth(initWidth, initHeight, newWidth);
  return {
    width: newWidth,
    height: newHeight,
  }
}

// пропорциональный расчет размера изображения для полного заполнения холста
export function calcSizeImgByCanvas(imgW: number, imgH: number, canvasW: number, canvasH: number): Size {
  let size = {
    width: imgW,
    height: imgH,
  }
  if (imgW < canvasW) {
    size = calcSizeByWidth(imgW, imgH, canvasW);
  }
  if (imgH < canvasH) {
    size = calcSizeByHeight(imgW, imgH, canvasH);
  }
  return size;
}